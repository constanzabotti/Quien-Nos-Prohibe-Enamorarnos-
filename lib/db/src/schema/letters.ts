import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lettersTable = pgTable("letters", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  mood: varchar("mood", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLetterSchema = createInsertSchema(lettersTable).omit({ id: true, createdAt: true });
export type InsertLetter = z.infer<typeof insertLetterSchema>;
export type Letter = typeof lettersTable.$inferSelect;
