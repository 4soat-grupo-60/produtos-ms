import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import "dotenv/config";

import IAppRoute from "../interfaces/IAppRoute";
import { DbConnection } from "../interfaces/dbconnection";
import ProductRoute from "./routes/ProductRoute";
import axios from "axios";

export default class StartUp {
  private dbConnection: DbConnection;

  public app: express.Application;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
    this.app = express();

    this.middler();
    this.initRoutes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,OPTIONS,PUT,POST,DELETE",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  initRoutes() {
    let routes: IAppRoute[] = [new ProductRoute(this.dbConnection)];

    let port = process.env.PORT || 3000;

    for (let route of routes) {
      route.setup(this.app);
    }

    this.app.route("/ping").get((req, res) => {
      res.send("produtos");
    });

    this.app.route("/ping-pedidos").get(async (req, res) => {
      try {
        const response = await axios.get(`${process.env.ORDER_API_URL}/ping`);
        res.send(`Response from pedidos-ms: ${response.data}`);
      } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
      }
    });

    this.app.listen(port, () => {
      console.log(`App está executando na porta ${port}`);
    });
  }
}
