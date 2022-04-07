const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
const session = require("express-session");
const { appendFile } = require("fs");
const app = express();

app.set("port", process.env.PORT || 3030);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.listen(app.get("port"), () =>
  console.log("listening on port http://localhost:" + app.get("port"))
);
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.static(path.resolve(__dirname, "../uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(session({ secret: "secret", saveUninitialized: true, resave: false }));
// Secret es una clave para encriptar y atrapar el dato la sesion
// Resave es para que la sesion se guarde de nuevo si no se modifica --> cache
// SaveUninitialized es determinar si voy a tener datos preguardados

app.use(require("./middlewares/user"));
app.use(require("./routes/main"));
app.use("/users", require("./routes/user"));