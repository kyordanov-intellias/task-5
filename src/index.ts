import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { db } from "./db";
import userRouter from "./modules/user/router";
import privateRouter from "./modules/private/router";
import config from "./config";

(async () => {
  await db.init();
  const app = new Koa();
  app.use(bodyParser());

  // app.use(async (ctx, next) => {
  //   console.log("Request Headers:", ctx.headers);
  //   console.log("Request Body:", ctx.request.body);
  //   await next();
  // });

  app.use(userRouter.routes());
  app.use(privateRouter.routes());

  app.listen(config.port, () => {
    console.log(`App is running on port ${config.port}`);
  });
})();
