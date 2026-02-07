import { Fragment } from "react";

type ArchiveMarkdownProps = {
    markdown: string;
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
            parts.push(
                <strong key={`${match.index}-strong`}>{token.slice(2, -2)}</strong>
            );
        } else if (token.startsWith("*")) {
            parts.push(
                <em key={`${match.index}-em`}>{token.slice(1, -1)}</em>
            );
        } else if (token.startsWith("`")) {
            parts.push(
                <code
                    key={`${match.index}-code`}
                    className="rounded bg-neutral-200 px-1 py-0.5 text-xs text-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-100"
                >
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

const ArchiveMarkdown = ({ markdown }: ArchiveMarkdownProps) => {
    const lines = markdown.split(/\r?\n/);
    const blocks: Array<string | JSX.Element> = [];
    let i = 0;

    const pushParagraph = (paragraphLines: string[], indexKey: number) => {
        const text = paragraphLines.join(" ").trim();
        if (!text) {
            return;
        }
        blocks.push(
            <p
                key={`p-${indexKey}`}
                className="text-sm text-neutral-600 dark:text-neutral-300"
            >
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
                <ul
                    key={`ul-${i}`}
                    className="list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300"
                >
                    {items.map((item, index) => (
                        <li key={`li-${i}-${index}`}>
                            {parseInlineMarkdown(item)}
                        </li>
                    ))}
                </ul>
            );
            continue;
        }

        const paragraphLines: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() &&
            !/^(#{1,3})\s+/.test(lines[i]) &&
            !/^\s*[-*]\s+/.test(lines[i])
        ) {
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

export default ArchiveMarkdown;
