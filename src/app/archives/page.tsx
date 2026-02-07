import Archives from "@/pages/Archives";

export const metadata = {
    title: "Archives",
    description: "Browse Dotshell public archives and download files from each snapshot.",
    alternates: {
        canonical: "/archives",
    },
};

export default function ArchivesPage() {
    return <Archives />;
}
