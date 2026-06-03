import type enAuth from "./locales/en/auth.json";
import type enCategory from "./locales/en/category.json";
import type enCommon from "./locales/en/common.json";
import type enDashboard from "./locales/en/dashboard.json";
import type enDivision from "./locales/en/division.json";
import type enHome from "./locales/en/home.json";
import type enTicket from "./locales/en/ticket.json";
import type enUser from "./locales/en/user.json";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: {
            common: typeof enCommon;
            auth: typeof enAuth;
            ticket: typeof enTicket;
            category: typeof enCategory;
            division: typeof enDivision;
            user: typeof enUser;
            dashboard: typeof enDashboard;
            home: typeof enHome;
        };
    }
}
