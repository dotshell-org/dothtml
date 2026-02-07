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
} from "@/components/archives/archiveUtils";

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
            const response = await fetch(`${ARCHIVE_API_BASE_URL}/`, { signal });
            if (!response.ok) {
                throw new Error("Failed to fetch archives");
            }
            const data = await response.json();
            const normalized = toArchiveList(data);
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
        const controller = new AbortController();
        const loadDetails = async () => {
            setDetailsStatus("loading");
            setSelectedArchive(null);
            try {
                const response = await fetch(buildArchiveUrl(selectedId), {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch archive details");
                }
                const contentType = response.headers.get("content-type") ?? "";
                const payload = contentType.includes("application/json")
                    ? await response.json()
                    : await response.text();
                setSelectedArchive(toArchiveDetails(payload, selectedId));
                setDetailsStatus("success");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }
                setDetailsStatus("error");
            }
        };
        loadDetails();
        return () => controller.abort();
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
            <section className="px-4 pb-16 pt-6 sm:pt-12">
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
