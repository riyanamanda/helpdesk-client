import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enTicket from "./locales/en/ticket.json";
import enCategory from "./locales/en/category.json";
import enDivision from "./locales/en/division.json";
import enUser from "./locales/en/user.json";
import enDashboard from "./locales/en/dashboard.json";
import enFeedback from "./locales/en/feedback.json";
import enHome from "./locales/en/home.json";
import enNotification from "./locales/en/notification.json";

import idCommon from "./locales/id/common.json";
import idAuth from "./locales/id/auth.json";
import idTicket from "./locales/id/ticket.json";
import idCategory from "./locales/id/category.json";
import idDivision from "./locales/id/division.json";
import idUser from "./locales/id/user.json";
import idDashboard from "./locales/id/dashboard.json";
import idFeedback from "./locales/id/feedback.json";
import idHome from "./locales/id/home.json";
import idNotification from "./locales/id/notification.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: enCommon,
                auth: enAuth,
                ticket: enTicket,
                category: enCategory,
                division: enDivision,
                user: enUser,
                dashboard: enDashboard,
                feedback: enFeedback,
                home: enHome,
                notification: enNotification,
            },
            id: {
                common: idCommon,
                auth: idAuth,
                ticket: idTicket,
                category: idCategory,
                division: idDivision,
                user: idUser,
                dashboard: idDashboard,
                feedback: idFeedback,
                home: idHome,
                notification: idNotification,
            },
        },
        defaultNS: "common",
        fallbackLng: "en",
        supportedLngs: ["en", "id"],
        detection: {
            order: ["localStorage"],
            lookupLocalStorage: "lang",
            caches: ["localStorage"],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
