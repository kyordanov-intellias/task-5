import Router from "koa-router";
import { auth } from "../../middleware/auth";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getSingleNote,
} from "./controller";
import { validate } from "../../middleware/validator";
import { noteValidationSchema } from "./validator";

const router = new Router({ prefix: "/notes" });

router.post("/", auth, validate(noteValidationSchema), createNote);
router.get("/", auth, getNotes);
router.get("/:id", auth, getSingleNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

export default router;
