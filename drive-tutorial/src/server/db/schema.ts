import { relations } from "drizzle-orm";
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
    key: varchar({ length: 255 }).notNull(),
    size: int().notNull(),
    url: text().notNull(),
    parent: bigint({ mode: "number" }).notNull(),
    ownerId: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_index").on(t.ownerId),
    ];
  },
);

export const foldersTable = createTable(
  "folders",
  {
    id: bigint({ mode: "number" }).primaryKey().autoincrement(),
    name: varchar({ length: 255 }).notNull(),
    parent: bigint({ mode: "number" }),
    ownerId: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_index").on(t.ownerId),
    ];
  },
);

export const foldersRelations = relations(foldersTable, ({ many }) => ({
  folders: many(foldersTable),
  files: many(filesTable),
}));

export const folderRelations = relations(foldersTable, ({ one }) => ({
  parent: one(foldersTable, {
    fields: [foldersTable.parent],
    references: [foldersTable.id],
  }),
}));

export const filesRelations = relations(filesTable, ({ one }) => ({
  parent: one(foldersTable, {
    fields: [filesTable.parent],
    references: [foldersTable.id],
  }),
}));

export type File = typeof filesTable.$inferSelect;
export type Folder = typeof foldersTable.$inferSelect;
