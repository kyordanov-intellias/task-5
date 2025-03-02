import config from "../config";
import * as dbLocal from "./local";

type Databases = {
  local: typeof dbLocal;
};

const dbs: Databases = {
  local: dbLocal,
};

export const db = dbs[config.db as keyof Databases] ?? dbLocal;