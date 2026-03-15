"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import NavBar from "@/components/generic/nav/NavBar";
import Footer from "@/components/generic/footer/Footer";
import { useI18n } from "@/i18n/useI18n";
import ArchiveDetailsPanel from "@/components/archives/ArchiveDetailsPanel";
import ArchiveHero from "@/components/archives/ArchiveHero";
import ArchiveListPanel from "@/components/archives/ArchiveListPanel";
import {
    ARCHIVE_API_BASE_URL,
    ArchiveDetails,
    ArchiveSummary,
    LoadStatus,
    buildArchiveUrl,
    buildFileTree,
    toArchiveDetails,
    toArchiveList,
    toTitle,
} from "@/components/archives/archiveUtils";

const parseTreePayload = (raw: string) => {
    try {
        return JSON.parse(raw) as Record<string, { files?: string[]; screenshots?: string[] }>;
    } catch {
        const repaired = raw
            .replace(/\](\s*)"/g, '],$1"')
            .replace(/\}(\s*)"/g, '},$1"');
        return JSON.parse(repaired) as Record<string, { files?: string[]; screenshots?: string[] }>;
    }
};

const Archives = () => {
    const { t } = useI18n();
    const [archives, setArchives] = useState<ArchiveSummary[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedArchive, setSelectedArchive] = useState<ArchiveDetails | null>(
        null
    );
    const [search, ] = useState("");
    const [listStatus, setListStatus] = useState<LoadStatus>("loading");
    const [detailsStatus, setDetailsStatus] = useState<LoadStatus>("idle");

    const fetchArchives = useCallback(async (signal?: AbortSignal) => {
        setListStatus("loading");
        try {
            const response = await fetch(`${ARCHIVE_API_BASE_URL}/tree.json`, { signal });
            if (!response.ok) {
                throw new Error("Failed to fetch archives");
            }
            const raw = await response.text();
            const data = parseTreePayload(raw);
            // Convert tree.json format to ArchiveSummary format
            const normalized = Object.keys(data).map(archiveId => ({
                id: archiveId,
                title: toTitle(archiveId),
                totalFiles: (data[archiveId].files?.length || 0) + (data[archiveId].screenshots?.length || 0)
            }));
            setArchives(normalized);
            setSelectedId((current) => {
                if (current && normalized.some((archive) => archive.id === current)) {
                    return current;
                }
                return normalized[0]?.id ?? null;
            });
            setListStatus("success");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            if (signal?.aborted) {
                return;
            }
            setListStatus("error");
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchArchives(controller.signal);
        return () => controller.abort();
    }, [fetchArchives]);

    useEffect(() => {
        if (!selectedId) {
            setSelectedArchive(null);
            return;
        }
        const loadDetails = async () => {
            setDetailsStatus("loading");
            setSelectedArchive(null);
            try {
                // Use the tree.json data that we already fetched
                const treeResponse = await fetch(`${ARCHIVE_API_BASE_URL}/tree.json`);
                if (!treeResponse.ok) {
                    throw new Error("Failed to fetch archive tree");
                }
                const treeRaw = await treeResponse.text();
                const treeData = parseTreePayload(treeRaw);
                const archiveData = treeData[selectedId];
                
                if (!archiveData) {
                    throw new Error("Archive not found in tree");
                }
                
                // Construct the archive details from tree.json structure
                const screenshots = archiveData.screenshots || [];
                const files = archiveData.files || [];
                
                // Check if there's a README.md file - check both in files array and at root level
                const readmePath = files.find((path: string) => 
                    /readme\.md$/i.test(path)
                ) || 'README.md'; // Also try root-level README.md
                
                let readmeContent = undefined;
                
                console.log('Files in archive:', files);
                console.log('Trying README path:', readmePath);
                
                // Try to fetch the README content
                const readmeUrl = `${ARCHIVE_API_BASE_URL}/${selectedId}/${readmePath}`;
                console.log('Fetching README from:', readmeUrl);
                try {
                    const readmeResponse = await fetch(readmeUrl);
                    console.log('README fetch response status:', readmeResponse.status);
                    if (readmeResponse.ok) {
                        readmeContent = await readmeResponse.text();
                        console.log('README content:', readmeContent.substring(0, 100) + '...');
                    } else {
                        // If root README.md not found, try other common README locations
                        const alternativeReadmePaths = [
                            'docs/README.md',
                            'documentation/README.md',
                            'README.md',
                            'readme.md'
                        ];
                        
                        for (const altPath of alternativeReadmePaths) {
                            if (files.includes(altPath)) {
                                const altUrl = `${ARCHIVE_API_BASE_URL}/${selectedId}/${altPath}`;
                                console.log('Trying alternative README path:', altPath);
                                const altResponse = await fetch(altUrl);
                                if (altResponse.ok) {
                                    readmeContent = await altResponse.text();
                                    console.log('Found README at alternative path:', altPath);
                                    break;
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error fetching README:', error);
                }
                
                setSelectedArchive({
                    id: selectedId,
                    screenshots: screenshots.map((screenshot: string) => `${selectedId}/screenshots/${screenshot}`),
                    files: files.map((file: string) => `${selectedId}/files/${file}`),
                    readme: readmeContent,
                    readmePath: readmePath
                });
                setDetailsStatus("success");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setDetailsStatus("error");
            }
        };
        loadDetails();
    }, [selectedId]);

    const filteredArchives = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) {
            return archives;
        }
        return archives.filter(
            (archive) =>
                archive.title.toLowerCase().includes(query) ||
                archive.id.toLowerCase().includes(query)
        );
    }, [archives, search]);

    const selectedSummary = useMemo(() => {
        if (!selectedId) {
            return null;
        }
        return archives.find((archive) => archive.id === selectedId) ?? null;
    }, [archives, selectedId]);

    const fileTree = useMemo(() => {
        if (!selectedArchive) {
            return [];
        }
        return buildFileTree(selectedArchive.files, selectedArchive.id);
    }, [selectedArchive]);

    return (
        <main className="min-h-screen">
            <NavBar />
            <section className="px-6 sm:px-8 pb-16 pt-6 sm:pt-12">
                <div className="mx-auto max-w-6xl">
                    <ArchiveHero
                        title={t("archives.title")}
                        titleAccent={t("archives.titleAccent")}
                        subtitle={t("archives.subtitle")}
                    />

                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                        <ArchiveListPanel
                            archives={filteredArchives}
                            selectedId={selectedId}
                            listStatus={listStatus}
                            onSelect={setSelectedId}
                            t={t}
                        />

                        <ArchiveDetailsPanel
                            selectedId={selectedId}
                            selectedSummary={selectedSummary}
                            selectedArchive={selectedArchive}
                            detailsStatus={detailsStatus}
                            fileTree={fileTree}
                            t={t}
                        />
                    </div>
                </div>
            </section>
            <div className="h-20"></div>
            <Footer />
        </main>
    );
};

export default Archives;
