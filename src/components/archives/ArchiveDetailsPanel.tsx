import type {
    ArchiveDetails,
    ArchiveSummary,
    LoadStatus,
    TreeNode,
} from "@/components/archives/archiveUtils";
import { buildArchiveUrl, buildFileUrl } from "@/components/archives/archiveUtils";
import ArchiveFileTree from "@/components/archives/ArchiveFileTree";
import ArchiveMarkdown from "@/components/archives/ArchiveMarkdown";
import ArchiveScreenshots from "@/components/archives/ArchiveScreenshots";

type ArchiveDetailsPanelProps = {
    selectedId: string | null;
    selectedSummary: ArchiveSummary | null;
    selectedArchive: ArchiveDetails | null;
    detailsStatus: LoadStatus;
    fileTree: TreeNode[];
    t: (key: string) => string;
};

const ArchiveDetailsPanel = ({
    selectedId,
    selectedSummary,
    selectedArchive,
    detailsStatus,
    fileTree,
    t,
}: ArchiveDetailsPanelProps) => {
    return (
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

            {selectedId &&
                detailsStatus === "success" &&
                selectedArchive && (
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
                                <ArchiveMarkdown markdown={selectedArchive.readme} />
                            </div>
                        ) : (
                            <p className="mt-3 text-sm text-neutral-500">
                                {t("archives.noReadme")}
                            </p>
                        )}

                        <div className="mb-14"></div>

                        <ArchiveScreenshots
                            screenshots={selectedArchive.screenshots}
                            t={t}
                        />

                        <ArchiveFileTree
                            fileTree={fileTree}
                            fileCount={selectedArchive.files.length}
                            t={t}
                        />
                    </div>
                )}
        </div>
    );
};

export default ArchiveDetailsPanel;
