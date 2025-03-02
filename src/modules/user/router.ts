import Router from "koa-router";
import { signUp, signIn, getUser, deleteUser, updateUser } from "./controller";
import { validate } from "../../middleware/validator";
import { createUserValidationSchema } from "./validation";

const router = new Router({ prefix: "/users" });

router.post("/signup", validate(createUserValidationSchema), signUp);
router.post("/signin", signIn);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
