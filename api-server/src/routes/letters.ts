import { Router, type IRouter } from "express";
import { db, lettersTable } from "@workspace/db";
import { SubmitLetterBody, GetLettersQueryParams } from "@workspace/api-zod";
import { desc } from "drizzle-orm";
import { notifyNewLetter } from "../services/mailer.js";

const router: IRouter = Router();

router.post("/letters", async (req, res) => {
  const parseResult = SubmitLetterBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request", details: parseResult.error.message });
    return;
  }

  const { content, mood } = parseResult.data;

  try {
    const [letter] = await db
      .insert(lettersTable)
      .values({ content, mood })
      .returning();

    // Respond immediately — email goes out async in the background
    res.status(201).json({
      id: letter.id,
      message: "Tu voz sí es escuchada",
      createdAt: letter.createdAt.toISOString(),
    });

    // Fire-and-forget: no await, no blocking the user
    notifyNewLetter({
      content: letter.content,
      mood:    letter.mood,
      createdAt: letter.createdAt,
    }).catch((err) => req.log.error({ err }, "Failed to send notification email"));

  } catch (err) {
    req.log.error({ err }, "Failed to insert letter");
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/letters", async (req, res) => {
  const queryResult = GetLettersQueryParams.safeParse(req.query);
  const limit = queryResult.success ? (queryResult.data.limit ?? 10) : 10;

  try {
    const letters = await db
      .select()
      .from(lettersTable)
      .orderBy(desc(lettersTable.createdAt))
      .limit(limit);

    const [{ count }] = await db.$count(lettersTable).then(
      (c) => [{ count: c }],
      () => [{ count: letters.length }]
    );

    res.json({
      letters: letters.map((l) => ({
        id: l.id,
        content: l.content,
        mood: l.mood,
        createdAt: l.createdAt.toISOString(),
      })),
      total: Number(count),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch letters");
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
