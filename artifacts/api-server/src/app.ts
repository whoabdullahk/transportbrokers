import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import dns from "dns";
import router from "./routes";
import { logger } from "./lib/logger";

dns.setDefaultResultOrder("ipv4first");

const app: Express = express();

// @ts-ignore
const pinoMiddleware = typeof pinoHttp === "function" ? pinoHttp : ((pinoHttp as any)?.default || (pinoHttp as any)?.pinoHttp || pinoHttp);

app.use(
  (pinoMiddleware as any)({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", router);

export default app;
