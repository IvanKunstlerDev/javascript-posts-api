import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config.js";
import { errorHandlingMiddleware } from "./errorHandling/middlewares/errorHandlingMiddleware.js";
import { notFoundRoute } from "./shared/notFoundRoute.js";
import authRouter from "./auth/authRouter.js";
import usersRouter from "./users/usersRouter.js";
import postsRouter from "./posts/postsRouter.js";

const app = express();

app.set("port", config.port);

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Marcas.");
});

app.use("/auth", authRouter);

app.use("/users", usersRouter);

app.use("/posts", postsRouter);

app.use("/*", notFoundRoute);

app.use(errorHandlingMiddleware);

export default app;
