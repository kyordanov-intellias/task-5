import Router from "koa-router";
import { privateData } from "./controller";
import { auth } from "../../middleware/auth";

const router = new Router({ prefix: "/private" });

router.get("/data", auth, privateData);

export default router;
