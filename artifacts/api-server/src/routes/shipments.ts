import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, loadsTable } from "@workspace/db";
import { TrackShipmentParams, TrackShipmentResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/shipments/:trackingNumber", async (req, res): Promise<void> => {
  const params = TrackShipmentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [load] = await db
    .select()
    .from(loadsTable)
    .where(eq(loadsTable.trackingId, params.data.trackingNumber));

  if (!load) {
    res.status(404).json({ error: "Shipment not found" });
    return;
  }

  res.json(TrackShipmentResponse.parse(load));
});

export default router;
