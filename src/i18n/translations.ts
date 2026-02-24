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
            logoAria: "Dotshell logo",
            redSection: {
                tclFedUpTitle: "We were fed up with the TCL app.",
                tclFedUpText: "Too little clarity, poor ergonomics... What we were looking for always took too many clicks, too much time, too much searching, when all we want is to quickly get the information we need.",
                peloIsTitle: "Pelo is",
                peloIsText: 'A <span class="font-extrabold">modern</span>,<span class="font-extrabold"> smooth</span> app, with <span class="font-extrabold">all the features</span> you need to travel the network!',
                featuresTitle: "Schedules, Routes, Offline, LIVE",
                featuresText: 'With Pelo, you get the world\'s <span class="font-extrabold">fastest open-source route planner</span> for public transport, <span class="font-extrabold">real-time positions</span> of all buses and trams (including <span class="font-extrabold">some not even on the TCL app</span>), traffic alerts, all <span class="font-extrabold">without internet connection</span>* !',
                offlineNote: '*A download of a few dozen MB is required to enable offline mode in the app settings. Real-time data such as LIVE mode and traffic alerts are only updated when an internet connection is available.'
            }
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
            logoAria: "Logo Dotshell",
            redSection: {
                tclFedUpTitle: "On en avait marre de l'application TCL.",
                tclFedUpText: "Trop peu de clarté, d'ergonomie... Ce qu'on cherchait prenait toujours trop de clics, trop de temps, trop de recherche alors que tout ce qu'on veut, c'est avoir vite l'information dont on a besoin.",
                peloIsTitle: "Pelo, c'est",
                peloIsText: 'Une application <span class="font-extrabold">moderne</span>,<span class="font-extrabold"> fluide</span>, avec <span class="font-extrabold">toutes les fonctionnalités</span> dont vous avez besoin pour voyager sur le réseau !',
                featuresTitle: "Horaires, Itinéraires, Hors-ligne, LIVE",
                featuresText: 'Avec Pelo, vous profiterez du système d\'itinéraire open-source sur réseau de transports en commun <span class="font-extrabold">le plus rapide du monde</span>, de la <span class="font-extrabold">position en temps réel</span> de tous les bus et tramway dont <span class="font-extrabold">certains ne sont même pas sur l\'application TCL </span> ou encore des alertes traffic, tout cela <span class="font-extrabold">sans connexion internet</span> * !',
                offlineNote: '*un téléchargement de quelques dizaines de Mo est nécessaire pour activer le mode hors-ligne dans les paramètres de l\'application. Les données en temps réel telles que le mode LIVE et les alertes traffic ne sont mises à jour qu\'en précense d\'une connexion internet.'
            }
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
