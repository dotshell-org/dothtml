import Archives from "@/pages/Archives";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Archives",
    description: "Browse Dotshell public archives and download files from each snapshot.",
    alternates: {
        canonical: "/archives",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function ArchivesPage() {
    return <Archives />;
}
