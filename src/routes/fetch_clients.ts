import express from "express";
import { createQueryBuilder } from "typeorm";

import { Client } from "../entities/Client";

const router = express.Router();

router.get("/api/clients", async (req, res) => {
  const client = await createQueryBuilder("client")
    .select("client.first_name")
    .addSelect("client.last_name")
    .addSelect("client.balance")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transactions")
    .where("client.id = :clientId", {
      clientId: "f596091d-4080-43d5-9d2b-cdaaddbf47c2",
    })
    .getOne();

  return res.json(client);
});

export { router as fetchClientRouter };
