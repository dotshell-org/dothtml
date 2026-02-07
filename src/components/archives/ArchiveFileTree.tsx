import type { TreeNode } from "@/components/archives/archiveUtils";
import { buildFileUrl } from "@/components/archives/archiveUtils";

type ArchiveFileTreeProps = {
    fileTree: TreeNode[];
    fileCount: number;
    t: (key: string) => string;
};

const ArchiveFileTree = ({ fileTree, fileCount, t }: ArchiveFileTreeProps) => {
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
        <div>
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xxs uppercase tracking-[0.25em] text-neutral-500">
                    {t("archives.filesTitle")}
                </h3>
                <span className="text-xxs uppercase tracking-[0.2em] text-neutral-400">
                    {fileCount}
                </span>
            </div>
            {fileCount > 0 ? (
                renderTree(fileTree)
            ) : (
                <p className="mt-3 text-sm text-neutral-500">
                    {t("archives.noFiles")}
                </p>
            )}
        </div>
    );
};

export default ArchiveFileTree;
