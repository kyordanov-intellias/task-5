import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import { Context, Next } from "koa";

const ajv = new Ajv();
ajvFormats(ajv);

export const validate = (schema: object) => {
  return async (ctx: Context, next: Next) => {
    const valid = ajv.validate(schema, ctx.request.body);
    if (!valid) {
      ctx.status = 400;
      ctx.body = { error: ajv.errorsText() };
      return;
    }
    await next();
  };
};
