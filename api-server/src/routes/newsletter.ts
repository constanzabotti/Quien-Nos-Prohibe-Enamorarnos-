import { Router, type IRouter } from "express";
import { db, newsletterTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";
import { notifyNewSubscriber } from "../services/mailer.js";

const router: IRouter = Router();

router.post("/newsletter", async (req, res) => {
  const parseResult = SubscribeNewsletterBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request", details: parseResult.error.message });
    return;
  }

  const { email, name } = parseResult.data;

  try {
    const inserted = await db
      .insert(newsletterTable)
      .values({ email, name })
      .onConflictDoNothing({ target: newsletterTable.email })
      .returning();

    res.status(201).json({
      message: "Te uniste a la Resistencia Poética. ¡Nos vemos en el lanzamiento!",
      subscribed: true,
    });

    if (inserted.length > 0) {
      notifyNewSubscriber({
        email,
        name,
        createdAt: inserted[0].createdAt ?? new Date(),
      }).catch((err) => req.log.error({ err }, "Failed to send subscriber notification"));
    }
  } catch (err) {
    req.log.error({ err }, "Failed to subscribe to newsletter");
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
