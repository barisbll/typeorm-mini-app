import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne({ where: { id: clientId } });

  const banker = await Banker.findOne({ where: { id: bankerId } });

  if (!client || !banker) {
    return res.json({
      msg: "Client or Banker not found",
    });
  }

  banker.clients = [...(banker.clients || []), client];

  await banker.save();

  return res.json({ msg: "Banker connected to client" });
});

export { router as connectBankerToClientRouter };
