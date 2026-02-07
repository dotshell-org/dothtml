type ArchiveHeroProps = {
    title: string;
    titleAccent: string;
    subtitle: string;
};

const ArchiveHero = ({ title, titleAccent, subtitle }: ArchiveHeroProps) => {
    return (
        <div className="my-16 text-center">
            <h1 className="mt-4 text-4xl font-black sm:text-5xl lg:text-6xl">
                {title} <span className="text-blue-500">{titleAccent}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500 dark:text-neutral-400 sm:text-lg">
                {subtitle}
            </p>
        </div>
    );
};

export default ArchiveHero;
