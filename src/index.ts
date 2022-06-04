import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";

import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transactions } from "./entities/Transaction";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_clients";

const app = express();
app.use(cors());

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.host,
      port: +process.env.port!,
      username: process.env.username,
      password: process.env.password,
      database: process.env.database,
      entities: [Client, Banker, Transactions],
      synchronize: true,
    });

    app.use(express.json());

    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClientRouter);
    app.use(deleteClientRouter);
    app.use(fetchClientRouter);

    app.listen(8080, () => {
      console.log("Listening on port 8080");
    });

    console.log("Connected to Postgres");
  } catch (error: any) {
    console.error("Unable to connect to postgres");
    throw new Error(error);
  }
};

main();
