import express, { Express } from "express";
import apiRoutes from "./routes/api";

const createServer = (): Express => {
  const app = express();

  app.use(express.json());

  app.use("/api", apiRoutes);

  return app;
};

export default createServer;
