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
        pelo: {
            subtitle: "The future of navigation through the <span style=\"color: #ef4444; font-weight: 900;\">Lyon TCL</span> network"
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
        },
        archives: {
            title: "Dotshell",
            titleAccent: "Archives",
            subtitle: "To keep an eye on the past.",
            searchLabel: "Search archives",
            searchPlaceholder: "Search by name or ID",
            listTitle: "All archives",
            countLabel: "archives",
            refresh: "Refresh",
            loading: "Loading archives...",
            error: "Unable to load archives.",
            emptyTitle: "No archives match your search.",
            emptyBody: "Try another query or refresh the list.",
            selectHint: "Select an archive to view details.",
            detailsTitle: "Archive details",
            openArchive: "Open JSON",
            idLabel: "ID",
            readmeTitle: "README",
            screenshotsTitle: "Screenshots",
            filesTitle: "Files",
            openFile: "Open file",
            download: "Download",
            noReadme: "No README available.",
            noScreenshots: "No screenshots found.",
            noFiles: "No files found."
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
        pelo: {
            subtitle: "Le futur de la navigation sur le <span style=\"color: #ef4444; font-weight: 900;\">réseau TCL</span> à Lyon"
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
        },
        archives: {
            title: "Archives",
            titleAccent: "Dotshell",
            subtitle: "Pour garder un œil sur le passé.",
            searchLabel: "Rechercher des archives",
            searchPlaceholder: "Rechercher par nom ou identifiant",
            listTitle: "Toutes les archives",
            countLabel: "archives",
            refresh: "Rafraîchir",
            loading: "Chargement des archives...",
            error: "Impossible de charger les archives.",
            emptyTitle: "Aucune archive ne correspond à la recherche.",
            emptyBody: "Essayez une autre requête ou rafraîchissez la liste.",
            selectHint: "Sélectionnez une archive pour voir les détails.",
            detailsTitle: "Détails de l'archive",
            openArchive: "Ouvrir le JSON",
            idLabel: "Identifiant",
            readmeTitle: "README",
            screenshotsTitle: "Captures",
            filesTitle: "Fichiers",
            openFile: "Ouvrir le fichier",
            download: "Télécharger",
            noReadme: "Aucun README disponible.",
            noScreenshots: "Aucune capture disponible.",
            noFiles: "Aucun fichier disponible."
        }
    }
} as const;
