var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");

var apiRouter = require("./routes/api");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sirve archivos estáticos desde la aplicación frontend React
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", apiRouter);

// Todo lo que no coincide con lo anterior, se envía a index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 y reenvíalo al manejador de errores.
app.use(function(req, res, next) {
  next(createError(404));
});

// manejador de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // renderiza la página de errores
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
