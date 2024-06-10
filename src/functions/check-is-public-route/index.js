// import { APP_ROUTES } from "@/constants/app-routes";
import { APP_ROUTES } from "../../constants/app-routes.js";

/**
 * 
 * @param asPath string
 * @returns boolean
 */

export const checkIsPublicRoute =
    (asPath) => {
        const appPublicRoutes = Object.values(APP_ROUTES.public);

        return appPublicRoutes.includes(asPath);
    };