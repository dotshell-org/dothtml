export const ARCHIVE_API_BASE_URL = "https://archives.dotshell.eu";

export type ArchiveSummary = {
    id: string;
    title: string;
    name?: string;
    description?: string;
    totalFiles?: number;
    updatedAt?: string;
};

export type ArchiveDetails = {
    id: string;
    name?: string;
    readme?: string;
    readmePath?: string;
    screenshots: string[];
    files: string[];
};

export type TreeNode = {
    name: string;
    path?: string;
    children?: TreeNode[];
};

export type LoadStatus = "idle" | "loading" | "success" | "error";

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

export const toArchiveList = (payload: unknown): ArchiveSummary[] => {
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

export const toArchiveDetails = (payload: unknown, id: string): ArchiveDetails => {
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
        readmePath:
            readmePath && typeof readmePath === "string"
                ? readmePath
                : undefined,
        screenshots: screenshotPaths,
        files: cleanedFiles,
    };
};

export const buildArchiveUrl = (archiveId: string) =>
    `${ARCHIVE_API_BASE_URL}/${encodeURIComponent(archiveId)}`;

export const buildFileUrl = (path: string) => {
    const trimmed = path.replace(/^\/+/, "");
    const encoded = trimmed
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");
    return `${ARCHIVE_API_BASE_URL}/file/${encoded}`;
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

export const buildFileTree = (paths: string[], archiveId: string): TreeNode[] => {
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

export const extractFileLabel = (path: string) => {
    const trimmed = path.replace(/\/+$/, "");
    const parts = trimmed.split("/");
    return parts[parts.length - 1] ?? trimmed;
};
