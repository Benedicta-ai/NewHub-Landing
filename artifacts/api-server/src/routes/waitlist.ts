import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { waitlistTable, insertWaitlistSchema } from "@workspace/db/schema";

const router: IRouter = Router();

router.post("/waitlist", async (req, res) => {
  console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
  console.log("Request body:", req.body);
  try {
    const parsed = insertWaitlistSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("Validation failed:", parsed.error);
      return res.status(400).json({ error: "Invalid email address" });
    }

    console.log("Inserting email:", parsed.data);
    await db.insert(waitlistTable).values(parsed.data);
    console.log("Insert successful");
    return res.status(201).json({ success: true });
  } catch (error: any) {
    console.error("Full error:", JSON.stringify(error, null, 2));
    console.error("Error message:", error.message);
    console.error("Error cause:", error.cause?.message);
    if (error?.code === "23505") {
      return res.status(409).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;