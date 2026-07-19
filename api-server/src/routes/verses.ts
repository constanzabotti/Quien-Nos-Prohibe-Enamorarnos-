import { Router, type IRouter } from "express";
import { db, versesTable } from "@workspace/db";
import { SubmitVerseBody, GetVersesQueryParams } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/verses", async (req, res) => {
  const parseResult = SubmitVerseBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request", details: parseResult.error.message });
    return;
  }

  const { verse, author } = parseResult.data;

  try {
    const [inserted] = await db
      .insert(versesTable)
      .values({ verse, author })
      .returning();

    res.status(201).json({
      id: inserted.id,
      message: "Tu verso ya forma parte del poema colectivo",
      createdAt: inserted.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to insert verse");
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/verses", async (req, res) => {
  const queryResult = GetVersesQueryParams.safeParse(req.query);
  const limit = queryResult.success ? (queryResult.data.limit ?? 20) : 20;

  try {
    const verses = await db
      .select()
      .from(versesTable)
      .orderBy(desc(versesTable.createdAt))
      .limit(limit);

    res.json({
      verses: verses.map((v) => ({
        id: v.id,
        verse: v.verse,
        author: v.author,
        createdAt: v.createdAt.toISOString(),
      })),
      total: verses.length,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch verses");
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
