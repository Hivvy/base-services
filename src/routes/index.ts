import express from "express";
import auth from "@/routes/auth";

const router = express.Router();

const defaultIRoute = [
    {
        path: "/auth",
        route: auth,
    },
];

defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
