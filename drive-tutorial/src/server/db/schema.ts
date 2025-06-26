import {
  index,
  int,
  singlestoreTableCreator,
  text,
  varchar,
  timestamp,
  bigint,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const filesTable = createTable(
  "files",
  {
    id: bigint({ mode: "number" }).primaryKey().autoincrement(),
    name: varchar({ length: 255 }).notNull(),
    size: int().notNull(),
    url: text().notNull(),
    parent: bigint({ mode: "number" }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export const foldersTable = createTable(
  "folders",
  {
    id: bigint({ mode: "number" }).primaryKey().autoincrement(),
    name: varchar({ length: 255 }).notNull(),
    parent: bigint({ mode: "number" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export type File = typeof filesTable.$inferSelect;
export type Folder = typeof foldersTable.$inferSelect;
