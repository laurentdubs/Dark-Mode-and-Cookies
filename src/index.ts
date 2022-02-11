import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/options", (request, response) => {
  response.render("options");
});

const formParser = express.urlencoded({ extended: true });

app.post("/home", formParser, (request, response) => {
  const color = request.body.appearance;
  response.set(
    "Set-Cookie",
    cookie.serialize("myCookie", color, {
      maxAge: 3600,
    }),
  );
  response.render("home", { color });
});

app.get("/view-cookie", (request, response) => {
  const cookies = cookie.parse(request.get("cookie") || "");
  response.send(cookies.myCookie);
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
