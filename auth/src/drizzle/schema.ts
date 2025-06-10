import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoles = ["user", "admin", "moderator"] as const;
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(UserTable, ({ many }) => ({
  oAuthAccounts: many(UserOAuthAccountTable),
}));

export const oAuthProviders = ["discord", "github"] as const;
export const oAuthProviderEnum = pgEnum("oauth_provider", oAuthProviders);

export const UserOAuthAccountTable = pgTable(
  "user_oauth_accounts",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    provider: oAuthProviderEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
);

export const userOauthAccountRelationships = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.userId],
      references: [UserTable.id],
    }),
  })
);
