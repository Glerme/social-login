import { Router } from "express";
import passport from "passport";

export const routes = Router();

routes.get("/", (req, res, next) => {
  const { user } = req;
  res.render("home", { user });
});

routes.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

routes.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/home");
});

routes.get(
  "/return",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res, next) => {
    res.redirect("/");
  }
);
