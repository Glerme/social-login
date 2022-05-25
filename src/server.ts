require("dotenv").config();

import express from "express";

import cors from "cors";
import path from "path";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/return",
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj as any);
});

app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);

app.listen(3333, () => {
  console.log("Server started http://localhost:3333");
});
