import express from "express";
import {
    getContents,
    createContent,
    updateContent,
    deleteContent,
} from "../controller/contents.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getContents);
router.post("/", auth, createContent);
router.patch("/:id", auth, updateContent);
router.delete("/:id", auth, deleteContent);

export default router;
