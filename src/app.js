const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./api/routes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocs = require("./swagger");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

const swaggerUiOptions = {
  explorer: true,
};

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, swaggerUiOptions)
);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
