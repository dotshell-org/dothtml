import Contact from "@/pages/Contact";
import Script from 'next/script';

export const metadata = {
    title: "Contact",
    description: "Have questions about our open source software solutions? Contact the Dotshell team for support, inquiries, or partnership opportunities. We're here to help your business succeed with open source software.",
    openGraph: {
        title: "Contact",
        description: "Have questions about our open source software solutions? Contact the Dotshell team for support, inquiries, or partnership opportunities.",
        type: "website",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
  return (
    <>
      <Script id="contact-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.eu",
            "@type": "ContactPage",
            "name": "Contact Dotshell",
            "description": "Contact page for Dotshell, a French organization developing open source software for businesses.",
            "url": "https://dotshell.eu/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Dotshell",
              "url": "https://dotshell.eu",
              "logo": "https://dotshell.eu/images/logo.png",
              "description": "A French organization dedicated to developing open source software for businesses.",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@dotshell.eu",
                "availableLanguage": ["English", "French"]
              }
            }
          }
        `}
      </Script>
      <Contact />
    </>
  );
}