import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { waitlistTable, insertWaitlistSchema } from "@workspace/db/schema";

const router: IRouter = Router();

router.post("/waitlist", async (req, res) => {
  try {
    const parsed = insertWaitlistSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    await db.insert(waitlistTable).values(parsed.data);
    return res.status(201).json({ success: true });
  } catch (error: any) {
    console.error("Waitlist error:", error);
    if (error?.code === "23505") {
      return res.status(409).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;