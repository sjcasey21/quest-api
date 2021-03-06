import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import graphqlPlayground from "graphql-playground-middleware-express";
import cors from "cors";

import schema from "./graphql/";

const app = express();
const PORT = process.env.PORT || "4000";
const db =
  "mongodb://" + (process.env.MONGO_URL || "localhost") + ":27017/quest-ql";

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("hello", err));

app.use(cors({origin: true}));
app.use(
  "/quest",
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: false
  })
);
app.get("/playground", graphqlPlayground({endpoint: "/quest"}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
