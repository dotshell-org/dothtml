export const supportedLocales = ["en", "fr"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export const translations = {
    en: {
        nav: {
            home: "Home",
            documentation: "Documentation",
            archives: "Archives",
            contact: "Contact"
        },
        home: {
            scroll: "Scroll",
            scrollToContent: "Scroll to content",
            logoAria: "Dotshell logo"
        },
        footer: {
            madeBy: "Made by",
            europe: "Europe",
            license: "MIT License"
        },
        logo: {
            logoAlt: "Dotshell Logo"
        },
        contact: {
            title: "Contact",
            titleAccent: "Us",
            formHeading: "Contact Form",
            fields: {
                name: "Name",
                email: "Email",
                country: "Country/Region",
                phone: "Phone number (optional)",
                company: "Company (optional)",
                message: "Message"
            },
            placeholders: {
                email: "email@example.com"
            },
            errors: {
                nameRequired: "Name is required.",
                emailRequired: "Email is required.",
                countryRequired: "Country is required.",
                messageRequired: "Message is required.",
                sendError: "Error while sending message.",
                networkError: "Network error."
            },
            submit: {
                sending: "Sending...",
                sent: "Sent",
                submit: "Submit"
            }
        }
    },
    fr: {
        nav: {
            home: "Accueil",
            documentation: "Documentation",
            archives: "Archives",
            contact: "Contact"
        },
        home: {
            scroll: "Défiler",
            scrollToContent: "Défiler vers le contenu",
            logoAria: "Logo Dotshell"
        },
        footer: {
            madeBy: "Créé par",
            europe: "Europe",
            license: "Licence MIT"
        },
        logo: {
            logoAlt: "Logo Dotshell"
        },
        contact: {
            title: "Nous",
            titleAccent: "Contacter",
            formHeading: "Formulaire de contact",
            fields: {
                name: "Nom",
                email: "Email",
                country: "Pays/Région",
                phone: "Numéro de telephone (optionnel)",
                company: "Entreprise (optionnel)",
                message: "Message"
            },
            placeholders: {
                email: "email@exemple.com"
            },
            errors: {
                nameRequired: "Le nom est requis.",
                emailRequired: "L'email est requis.",
                countryRequired: "Le pays est requis.",
                messageRequired: "Le message est requis.",
                sendError: "Erreur lors de l'envoi du message.",
                networkError: "Erreur reseau."
            },
            submit: {
                sending: "Envoi en cours...",
                sent: "Envoyé",
                submit: "Envoyer"
            }
        }
    }
} as const;
