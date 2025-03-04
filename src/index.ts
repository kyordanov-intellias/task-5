import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { db } from "./db";
import userRouter from "./modules/user/router";
import privateRouter from "./modules/private/router";
import notesRouter from "./modules/notes/router";
import config from "./config";

(async () => {
  await db.init();
  const app = new Koa();
  app.use(bodyParser());

  app.use(userRouter.routes());
  app.use(privateRouter.routes());
  app.use(notesRouter.routes());

  app.listen(config.port, () => {
    console.log(`App is running on port ${config.port}`);
  });
})();
