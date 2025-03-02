import { db } from "../../db";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import { Context } from "koa";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const signUp = async (ctx: any) => {
  const { email, name, password } = ctx.request.body;
  const user = { id: crypto.randomUUID(), email, name, password };
  await db.storage.add(user.id, user);
  ctx.body = { message: "User created", user };
};

export const signIn = async (ctx: Context) => {
  const { email, password } = ctx.request.body as User;
  const user = await db.storage.getBy("email", email);
  if (!user || user.password !== password) {
    ctx.status = 401;
    ctx.body = { error: "Invalid credentials" };
    return;
  }
  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  ctx.body = { token };
};

export const getUser = async (ctx: Context) => {
  const userId: string = ctx.params.id;
  const user: User = await db.storage.getBy("id", userId);
  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: `There is no such user -> we are doomed`,
    };
    return;
  }
  ctx.body = {
    message: `User credentials ${user.email} => ${user.name}`,
  };
};

export const deleteUser = async (ctx: Context) => {
  const userId: string = ctx.params.id;
  const user: User = await db.storage.getBy("id", userId);
  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: `There is no such user -> we are doomed`,
    };
    return;
  }
  await db.storage.delete(userId);
  ctx.body = {
    message: `User was deleted`,
  };
};

export const updateUser = async (ctx: Context) => {
  const userId: string = ctx.params.id;

  const user: User = await db.storage.getBy("id", userId);
  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: `There is no such user -> we are doomed`,
    };
    return;
  }

  const updateData: Partial<User> = ctx.request.body;
  const updatedUser = { ...user, ...updateData };

  await db.storage.update(user.id, updatedUser);

  ctx.body = {
    message: `${user.name} was updated!`,
    user: updatedUser,
  };
};
