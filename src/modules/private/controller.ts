export const privateData = async (ctx: any) => {
  ctx.body = { message: "This is private data in which token is required, so you are good to go" };
};
