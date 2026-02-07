import type { ArchiveSummary, LoadStatus } from "@/components/archives/archiveUtils";

type ArchiveListPanelProps = {
    archives: ArchiveSummary[];
    selectedId: string | null;
    listStatus: LoadStatus;
    onSelect: (id: string) => void;
    t: (key: string) => string;
};

const ArchiveListPanel = ({
    archives,
    selectedId,
    listStatus,
    onSelect,
    t,
}: ArchiveListPanelProps) => {
    return (
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xxs uppercase tracking-[0.25em] text-neutral-400">
                        {archives.length} {t("archives.countLabel")}
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

            {listStatus === "success" && archives.length === 0 && (
                <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 px-4 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800">
                    <p className="font-semibold text-neutral-600 dark:text-neutral-300">
                        {t("archives.emptyTitle")}
                    </p>
                    <p className="mt-2">{t("archives.emptyBody")}</p>
                </div>
            )}

            {listStatus === "success" && archives.length > 0 && (
                <ul className="mt-6 space-y-3">
                    {archives.map((archive) => {
                        const isSelected = archive.id === selectedId;
                        return (
                            <li key={archive.id}>
                                <button
                                    type="button"
                                    onClick={() => onSelect(archive.id)}
                                    className="w-full rounded-xl py-3 text-left"
                                    aria-pressed={isSelected}
                                >
                                    <span
                                        className={`cursor-pointer text-lg text-black transition hover:underline dark:text-white ${
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
    );
};

export default ArchiveListPanel;
