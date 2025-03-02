import * as fs from "node:fs";

export const storage = {
  map: new Map(),
  async add(id: string, data: unknown) {
    if (this.map.get(id)) {
      throw new Error(`Entity with id ${id} exists`);
    }
    this.map.set(id, data);
    await this.persist();
  },

  async update(id: string, data: unknown) {
    if (!this.map.get(id)) {
      throw new Error(`Item with id ${id} does not exist`);
    }
    this.map.set(id, data);
    await this.persist();
  },

  async delete(id: string) {
    this.map.delete(id);
    await this.persist();
  },

  async get(id?: string) {
    if (id) {
      return this.map.get(id);
    }
    return Array.from(this.map.values());
  },

  async getBy(propKey: string, propVal: any) {
    for (const item of this.map.values()) {
      if (item[propKey] && item[propKey] === propVal) {
        return item;
      }
    }
  },

  async persist() {
    fs.writeFileSync(
      "./db.json",
      JSON.stringify(Array.from(this.map.values()))
    );
  },
};

export const init = async () => {
  if (fs.existsSync("./db.json")) {
    try {
      const dataBuffer = fs.readFileSync("./db.json");
      const data = dataBuffer.toString();
      if (data.length > 0) {
        for (const item of JSON.parse(data)) {
          await storage.add(item.id, item);
        }
      }
    } catch (error) {
      console.log(`DB init error`, error);
    }
  }
};
