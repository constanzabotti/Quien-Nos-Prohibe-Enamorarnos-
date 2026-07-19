import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const versesTable = pgTable("verses", {
  id: serial("id").primaryKey(),
  verse: text("verse").notNull(),
  author: varchar("author", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVerseSchema = createInsertSchema(versesTable).omit({ id: true, createdAt: true });
export type InsertVerse = z.infer<typeof insertVerseSchema>;
export type Verse = typeof versesTable.$inferSelect;
