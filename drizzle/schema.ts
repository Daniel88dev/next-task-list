import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkId: varchar().notNull(),
    firstName: varchar({ length: 50 }).notNull(),
    lastName: varchar({ length: 50 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    dailyReport: boolean("daily_report").default(false),
    premiumUser: boolean("premium_user").default(false),
    isActive: boolean("is_active").default(true),
    isAdmin: boolean("is_admin").default(false),
    updatedAt: timestamp("updated_at").defaultNow(),
    lastTask: integer("last_task").default(0),
  },
  (userTable) => {
    return {
      uniqueClerkId: uniqueIndex("unique_clerk_idx").on(userTable.clerkId),
    };
  }
);

export const statusEnum = pgEnum("status", [
  "todo",
  "in_progress",
  "completed",
]);

export const priorityEnum = pgEnum("priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const projectsTable = pgTable("projects_table", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
});

export const taskTable = pgTable(
  "task_table",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    taskUserId: varchar("task_user_id", { length: 10 }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    type: varchar("type").notNull(),
    status: statusEnum().default("todo"),
    priority: priorityEnum().default("low"),
    dueDate: timestamp("due_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
    completedAt: timestamp("completed_at"),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (taskTable) => {
    return {
      uniqueTaskUserId: uniqueIndex("unique_task_user_idx").on(
        taskTable.taskUserId
      ),
    };
  }
);

export const shoppingListTable = pgTable("shopping_list_table", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  category: varchar("category", { length: 50 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  isOpen: boolean("is_open").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});
