import express from "express";
const router = express.Router();
router.get("/login", (req, res) => {
    return res.send({
        message: "login",
    });
});

export default router;
