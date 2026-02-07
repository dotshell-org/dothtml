"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import NavBar from "@/components/generic/nav/NavBar";
import Footer from "@/components/generic/footer/Footer";
import { useI18n } from "@/i18n/useI18n";

const API_BASE_URL = "https://archives.dotshell.eu";

type ArchiveSummary = {
    id: string;
    title: string;
    name?: string;
    description?: string;
    totalFiles?: number;
    updatedAt?: string;
};

type ArchiveDetails = {
    id: string;
    name?: string;
    readme?: string;
    readmePath?: string;
    screenshots: string[];
    files: string[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

const toTitle = (value: string) => {
    return value
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (match) => match.toUpperCase());
};

const getString = (value: unknown): string | undefined => {
    if (typeof value === "string") {
        return value;
    }
    if (isRecord(value) && typeof value.content === "string") {
        return value.content;
    }
    return undefined;
};

const uniqueStrings = (values: string[]) =>
    Array.from(
        new Set(
            values
                .map((value) => value.trim())
                .filter((value) => value.length > 0)
        )
    );

const toStringArray = (value: unknown): string[] => {
    if (Array.isArray(value)) {
        const direct = value.filter(
            (item): item is string => typeof item === "string"
        );
        if (direct.length > 0) {
            return direct;
        }
        const named = value
            .map((item) => {
                if (isRecord(item)) {
                    return getString(item.path) ?? getString(item.name);
                }
                return undefined;
            })
            .filter((item): item is string => Boolean(item));
        return named;
    }
    if (isRecord(value)) {
        const collected: string[] = [];
        Object.values(value).forEach((entry) => {
            if (typeof entry === "string") {
                collected.push(entry);
            } else if (Array.isArray(entry)) {
                entry.forEach((item) => {
                    if (typeof item === "string") {
                        collected.push(item);
                    }
                });
            }
        });
        return collected;
    }
    return [];
};

const isImagePath = (path: string) =>
    /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(path);

const splitFiles = (files: string[], screenshots: string[]) => {
    const uniqueFiles = uniqueStrings(files);
    const providedScreenshots = uniqueStrings(screenshots);
    const derivedScreenshots =
        providedScreenshots.length > 0
            ? providedScreenshots
            : uniqueFiles.filter(
                  (path) => path.includes("screenshots/") || isImagePath(path)
              );
    const remainingFiles = uniqueFiles.filter(
        (path) => !derivedScreenshots.includes(path)
    );
    return { screenshotPaths: derivedScreenshots, remainingFiles };
};

const toArchiveList = (payload: unknown): ArchiveSummary[] => {
    const list = Array.isArray(payload)
        ? payload
        : isRecord(payload) && Array.isArray(payload.archives)
          ? payload.archives
          : isRecord(payload) && Array.isArray(payload.data)
            ? payload.data
            : [];

    return list
        .map((entry) => {
            if (typeof entry === "string") {
                return { id: entry, title: toTitle(entry) };
            }
            if (!isRecord(entry)) {
                return null;
            }
            const id =
                getString(entry.id) ??
                getString(entry.slug) ??
                getString(entry.name);
            if (!id) {
                return null;
            }
            const name = getString(entry.name);
            const title = getString(entry.title) ?? name ?? toTitle(id);
            const description =
                getString(entry.description) ?? getString(entry.summary);
            let totalFiles: number | undefined;
            if (typeof entry.files === "number") {
                totalFiles = entry.files;
            } else if (Array.isArray(entry.files)) {
                totalFiles = entry.files.length;
            } else if (isRecord(entry.files)) {
                totalFiles = Object.keys(entry.files).length;
            }
            const updatedAt =
                getString(entry.updatedAt) ?? getString(entry.updated_at);
            return { id, title, name, description, totalFiles, updatedAt };
        })
        .filter((entry): entry is ArchiveSummary => Boolean(entry));
};

const toArchiveDetails = (payload: unknown, id: string): ArchiveDetails => {
    if (typeof payload === "string") {
        return { id, readme: payload, screenshots: [], files: [] };
    }

    if (Array.isArray(payload)) {
        const files = payload.filter(
            (entry): entry is string => typeof entry === "string"
        );
        const { screenshotPaths, remainingFiles } = splitFiles(files, []);
        const readmePath = remainingFiles.find((path) =>
            /readme\.md$/i.test(path)
        );
        const cleanedFiles = readmePath
            ? remainingFiles.filter((path) => path !== readmePath)
            : remainingFiles;
        return {
            id,
            readme: undefined,
            readmePath,
            screenshots: screenshotPaths,
            files: cleanedFiles,
        };
    }

    const base = isRecord(payload) ? payload : {};
    const source = isRecord(base.content)
        ? base.content
        : isRecord(base.archive)
          ? base.archive
          : isRecord(base.data)
            ? base.data
            : base;

    const name = getString(source.name);
    const readme =
        getString(source.readme) ??
        getString(source.README) ??
        getString(source["README.md"]) ??
        getString(source["readme.md"]);

    const fileList = toStringArray(
        source.files ??
            source.fileList ??
            source.documents ??
            source.entries ??
            source.items ??
            source.paths
    );
    const screenshotList = toStringArray(
        source.screenshots ?? source.images ?? source.previews ?? source.thumbs
    );

    const { screenshotPaths, remainingFiles } = splitFiles(
        fileList,
        screenshotList
    );
    const readmePath = remainingFiles.find((path) => /readme\.md$/i.test(path));
    const cleanedFiles = readmePath
        ? remainingFiles.filter((path) => path !== readmePath)
        : remainingFiles;

    return {
        id,
        name,
        readme,
        readmePath: readmePath && typeof readmePath === "string"
            ? readmePath
            : undefined,
        screenshots: screenshotPaths,
        files: cleanedFiles,
    };
};

const buildArchiveUrl = (archiveId: string) =>
    `${API_BASE_URL}/${encodeURIComponent(archiveId)}`;

const buildFileUrl = (path: string) => {
    const trimmed = path.replace(/^\/+/, "");
    const encoded = trimmed
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");
    return `${API_BASE_URL}/file/${encoded}`;
};

type TreeNode = {
    name: string;
    path?: string;
    children?: TreeNode[];
};

const normalizeFileDisplayPath = (path: string, archiveId: string) => {
    const trimmed = path.replace(/^\/+/, "");
    const archivePrefix = `${archiveId}/files/`;
    if (trimmed.startsWith(archivePrefix)) {
        return trimmed.slice(archivePrefix.length);
    }
    const filesIndex = trimmed.indexOf("/files/");
    if (filesIndex !== -1) {
        return trimmed.slice(filesIndex + "/files/".length);
    }
    if (trimmed.startsWith("files/")) {
        return trimmed.slice("files/".length);
    }
    return trimmed;
};

const buildFileTree = (paths: string[], archiveId: string): TreeNode[] => {
    const root: TreeNode = { name: "root", children: [] };
    paths.forEach((rawPath) => {
        const displayPath = normalizeFileDisplayPath(rawPath, archiveId);
        const cleaned = displayPath.split("/").filter(Boolean);
        let current = root;
        cleaned.forEach((segment, index) => {
            if (!current.children) {
                current.children = [];
            }
            const existing = current.children.find((node) => node.name === segment);
            if (existing) {
                current = existing;
            } else {
                const next: TreeNode = { name: segment };
                current.children.push(next);
                current = next;
            }
            if (index === cleaned.length - 1) {
                current.path = rawPath;
            }
        });
    });
    return root.children ?? [];
};

const extractFileLabel = (path: string) => {
    const trimmed = path.replace(/\/+$/, "");
    const parts = trimmed.split("/");
    return parts[parts.length - 1] ?? trimmed;
};

const parseInlineMarkdown = (text: string): Array<string | JSX.Element> => {
    const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
    const parts: Array<string | JSX.Element> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const token = match[0];
        if (token.startsWith("**")) {
            parts.push(<strong key={`${match.index}-strong`}>{token.slice(2, -2)}</strong>);
        } else if (token.startsWith("*")) {
            parts.push(<em key={`${match.index}-em`}>{token.slice(1, -1)}</em>);
        } else if (token.startsWith("`")) {
            parts.push(
                <code key={`${match.index}-code`} className="rounded bg-neutral-200 px-1 py-0.5 text-xs text-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-100">
                    {token.slice(1, -1)}
                </code>
            );
        } else if (token.startsWith("[")) {
            const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
            if (linkMatch) {
                parts.push(
                    <a
                        key={`${match.index}-link`}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        {linkMatch[1]}
                    </a>
                );
            } else {
                parts.push(token);
            }
        } else {
            parts.push(token);
        }
        lastIndex = match.index + token.length;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return parts;
};

const renderMarkdown = (markdown: string) => {
    const lines = markdown.split(/\r?\n/);
    const blocks: Array<string | JSX.Element> = [];
    let i = 0;

    const pushParagraph = (paragraphLines: string[], indexKey: number) => {
        const text = paragraphLines.join(" ").trim();
        if (!text) {
            return;
        }
        blocks.push(
            <p key={`p-${indexKey}`} className="text-sm text-neutral-600 dark:text-neutral-300">
                {parseInlineMarkdown(text)}
            </p>
        );
    };

    while (i < lines.length) {
        const line = lines[i];
        if (!line.trim()) {
            i += 1;
            continue;
        }
        const headingMatch = /^(#{1,3})\s+(.*)$/.exec(line);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const content = headingMatch[2].trim();
            const HeadingTag = level === 1 ? "h2" : level === 2 ? "h3" : "h4";
            blocks.push(
                <HeadingTag
                    key={`h-${i}`}
                    className="mt-4 text-base font-semibold text-neutral-800 dark:text-neutral-100"
                >
                    {parseInlineMarkdown(content)}
                </HeadingTag>
            );
            i += 1;
            continue;
        }

        if (/^\s*[-*]\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
                i += 1;
            }
            blocks.push(
                <ul key={`ul-${i}`} className="list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
                    {items.map((item, index) => (
                        <li key={`li-${i}-${index}`}>{parseInlineMarkdown(item)}</li>
                    ))}
                </ul>
            );
            continue;
        }

        const paragraphLines: string[] = [];
        while (i < lines.length && lines[i].trim() && !/^(#{1,3})\s+/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i])) {
            paragraphLines.push(lines[i]);
            i += 1;
        }
        pushParagraph(paragraphLines, i);
    }

    return (
        <div className="space-y-3">
            {blocks.map((block, index) => (
                <Fragment key={`block-${index}`}>{block}</Fragment>
            ))}
        </div>
    );
};

const Archives = () => {
    const { t } = useI18n();
    const [archives, setArchives] = useState<ArchiveSummary[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedArchive, setSelectedArchive] = useState<ArchiveDetails | null>(null);
    const [search, setSearch] = useState("");
    const [listStatus, setListStatus] = useState<"idle" | "loading" | "success" | "error">("loading");
    const [detailsStatus, setDetailsStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const fetchArchives = useCallback(async (signal?: AbortSignal) => {
        setListStatus("loading");
        try {
            const response = await fetch(`${API_BASE_URL}/`, { signal });
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
                const response = await fetch(buildArchiveUrl(selectedId), { signal: controller.signal });
                if (!response.ok) {
                    throw new Error("Failed to fetch archive details");
                }
                const contentType = response.headers.get("content-type") ?? "";
                const payload = contentType.includes("application/json")
                    ? await response.json()
                    : await response.text();
                setSelectedArchive(toArchiveDetails(payload, selectedId));
                setDetailsStatus("success");
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
        return archives.filter((archive) =>
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

    const renderTree = (nodes: TreeNode[], depth = 0) => {
        return (
            <ul className={`space-y-1 ${depth > 0 ? "pl-4" : ""}`}>
                {nodes.map((node) => {
                    const hasChildren = node.children && node.children.length > 0;
                    return (
                        <li key={`${node.name}-${node.path ?? "folder"}`}>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                                {node.path ? (
                                    <a
                                        href={buildFileUrl(node.path)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="truncate text-blue-500 hover:text-blue-600"
                                    >
                                        {node.name}
                                    </a>
                                ) : (
                                    <span className="truncate">{node.name}</span>
                                )}
                            </div>
                            {hasChildren && renderTree(node.children ?? [], depth + 1)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <main className="min-h-screen">
            <NavBar />
            <section className="px-4 pb-16 pt-6 sm:pt-12">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center my-16">
                        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black">
                            {t("archives.title")}{" "}
                            <span className="text-blue-500">{t("archives.titleAccent")}</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
                            {t("archives.subtitle")}
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                        <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xxs uppercase tracking-[0.25em] text-neutral-400">
                                        {filteredArchives.length} {t("archives.countLabel")}
                                    </p>
                                    <h2 className="mt-1 text-2xl font-semibold">
                                        {t("archives.listTitle")}
                                    </h2>
                                </div>
                            </div>

                            {listStatus === "loading" && (
                                <div className="mt-6 flex items-center gap-3 text-neutral-500">
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-blue-500"></span>
                                    <p className="text-sm">{t("archives.loading")}</p>
                                </div>
                            )}

                            {listStatus === "error" && (
                                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
                                    {t("archives.error")}
                                </div>
                            )}

                            {listStatus === "success" && filteredArchives.length === 0 && (
                                <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 px-4 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800">
                                    <p className="font-semibold text-neutral-600 dark:text-neutral-300">
                                        {t("archives.emptyTitle")}
                                    </p>
                                    <p className="mt-2">{t("archives.emptyBody")}</p>
                                </div>
                            )}

                            {listStatus === "success" && filteredArchives.length > 0 && (
                                <ul className="mt-6 space-y-3">
                                    {filteredArchives.map((archive) => {
                                        const isSelected = archive.id === selectedId;
                                        return (
                                            <li key={archive.id}>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedId(archive.id)}
                                                    className="w-full rounded-xl py-3 text-left"
                                                    aria-pressed={isSelected}
                                                >
                                                    <span
                                                        className={`text-lg text-black transition hover:underline dark:text-white cursor-pointer ${
                                                            isSelected ? "font-semibold" : "font-medium"
                                                        }`}
                                                    >
                                                        {archive.name ?? archive.title}
                                                    </span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>

                        <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p className="text-xxs uppercase tracking-[0.25em] text-neutral-400">
                                        {t("archives.detailsTitle")}
                                    </p>
                                    <h2 className="mt-1 text-2xl font-semibold">
                                        {selectedArchive?.name ??
                                            selectedSummary?.name ??
                                            selectedSummary?.title ??
                                            t("archives.detailsTitle")}
                                    </h2>
                                    {selectedId && (
                                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                            {selectedId}
                                        </p>
                                    )}
                                </div>
                                {selectedId && (
                                    <a
                                        href={buildArchiveUrl(selectedId)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xxs uppercase tracking-[0.25em] text-neutral-600 transition hover:border-blue-300 hover:text-blue-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
                                    >
                                        {t("archives.openArchive")}
                                    </a>
                                )}
                            </div>

                            {!selectedId && (
                                <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800">
                                    {t("archives.selectHint")}
                                </div>
                            )}

                            {selectedId && detailsStatus === "loading" && (
                                <div className="mt-6 flex items-center gap-3 text-neutral-500">
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-blue-500"></span>
                                    <p className="text-sm">{t("archives.loading")}</p>
                                </div>
                            )}

                            {selectedId && detailsStatus === "error" && (
                                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
                                    {t("archives.error")}
                                </div>
                            )}

                            {selectedId && detailsStatus === "success" && selectedArchive && (
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center justify-between gap-3">
                                        {selectedArchive.readmePath && (
                                            <a
                                                href={buildFileUrl(selectedArchive.readmePath)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xxs uppercase tracking-[0.2em] text-blue-500 hover:text-blue-600"
                                            >
                                                {t("archives.openFile")}
                                            </a>
                                        )}
                                    </div>
                                    {selectedArchive.readme ? (
                                        <div className="mt-3">
                                            {renderMarkdown(selectedArchive.readme)}
                                        </div>
                                    ) : (
                                        <p className="mt-3 text-sm text-neutral-500">
                                            {t("archives.noReadme")}
                                        </p>
                                    )}

                                    <div className="mb-14"></div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xxs uppercase tracking-[0.25em] text-neutral-500">
                                                {t("archives.screenshotsTitle")}
                                            </h3>
                                            <span className="text-xxs uppercase tracking-[0.2em] text-neutral-400">
                                                {selectedArchive.screenshots.length}
                                            </span>
                                        </div>
                                        {selectedArchive.screenshots.length > 0 ? (
                                            <div className="mt-4">
                                                    <div className="relative group px-4">

                                                    <button className="swiper-button-prev-custom absolute left-0 -translate-x-5 top-1/2 z-10 -translate-y-1/2 p-2 text-neutral-400 transition enabled:hover:text-blue-500 enabled:cursor-pointer disabled:opacity-30">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                                                    </button>

                                                    <Swiper
                                                        modules={[Navigation]}
                                                        navigation={{
                                                            prevEl: ".swiper-button-prev-custom",
                                                            nextEl: ".swiper-button-next-custom",
                                                        }}
                                                        spaceBetween={16}
                                                        slidesPerView={1}
                                                        breakpoints={{
                                                            768: { slidesPerView: 2 },
                                                            1024: { slidesPerView: 3 },
                                                        }}
                                                        className="archives-swiper"
                                                    >
                                                        {selectedArchive.screenshots.map((path) => (
                                                            <SwiperSlide key={path}>
                                                                <a
                                                                    href={buildFileUrl(path)}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="group block rounded-2xl border border-neutral-200 bg-white p-2 transition hover:border-blue-200 dark:border-neutral-800 dark:bg-neutral-950"
                                                                >
                                                                    <img
                                                                        src={buildFileUrl(path)}
                                                                        alt={extractFileLabel(path)}
                                                                        className="h-40 w-full rounded-xl object-cover"
                                                                        loading="lazy"
                                                                    />
                                                                    <p className="mt-2 truncate text-xs text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                                                                        {extractFileLabel(path)}
                                                                    </p>
                                                                </a>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>

                                                    <button className="swiper-button-next-custom absolute right-0 translate-x-4 top-1/2 z-10 -translate-y-1/2 p-2 text-neutral-400 transition enabled:hover:text-blue-500 enabled:cursor-pointer disabled:opacity-30">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="mt-3 text-sm text-neutral-500">
                                                {t("archives.noScreenshots")}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xxs uppercase tracking-[0.25em] text-neutral-500">
                                                {t("archives.filesTitle")}
                                            </h3>
                                            <span className="text-xxs uppercase tracking-[0.2em] text-neutral-400">
                                                {selectedArchive.files.length}
                                            </span>
                                        </div>
                                        {selectedArchive.files.length > 0 ? (
                                            renderTree(fileTree)
                                        ) : (
                                            <p className="mt-3 text-sm text-neutral-500">
                                                {t("archives.noFiles")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className="h-20"></div>
            <Footer />
        </main>
    );
};

export default Archives;
