import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const feedbackRoutes: RouteObject[] = [
    {
        path: ROUTES.FEEDBACK.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { FeedbackPage } = await import("./pages/FeedbackPage");
                    return { Component: FeedbackPage };
                },
            },
            {
                path: ROUTES.FEEDBACK.CREATE,
                lazy: async () => {
                    const { CreateFeedbackPage } = await import("./pages/CreateFeedbackPage");
                    return { Component: CreateFeedbackPage };
                },
            },
        ],
    },
];
