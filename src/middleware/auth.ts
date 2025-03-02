import * as jwt from "jsonwebtoken";
import { Context, Next } from "koa";
import config from "../config";

export const auth = async (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization?.split(" ")[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "No token provided" };
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    ctx.state.user = decoded;
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "Invalid token" };
  }
};
