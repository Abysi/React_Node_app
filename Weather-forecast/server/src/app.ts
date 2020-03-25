import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import firebase from "firebase";
import "firebase/database";
import bodyparser from "body-parser";
import jwt from "jsonwebtoken";
import authenticateToken from "./middlewares/authenticateJWT";
import { firebaseConfig } from "./config/serverConfig";
import { IUser } from "./models/IUser";
import { getOpenWeatherUrl } from "./config/openweatherConfig";
import { logger } from "./modules/winston/winston";

firebase.initializeApp(firebaseConfig);
dotenv.config();
export const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);

app.post("/login", (req: Request, res: Response) => {
  logger.log("info", "Post request /login");
  const login = req.body.username;
  const password = req.body.password;
  firebase
    .database()
    .ref()
    .child(login)
    .once("value", snapshot => {
      const user: IUser = snapshot.val();
      if (user !== null) {
        if (login === user.login && password === user.password) {
          const accessToken: string = jwt.sign(
            user.login,
            process.env.ACCESS_TOKEN_SECRET
          );
          const userProfile = {
            accessToken,
            cityArray: user.cities,
            login: user.login
          };
          logger.log(
            "info",
            `Post request /login result:return user profile:${userProfile}`
          );
          return res.status(200).json(userProfile);
        } else {
          logger.log(
            "error",
            "Post request /login result:error(Incorrect password)"
          );
          res.status(400).send("Incorrect password");
        }
      } else {
        logger.log("error", "Post request/login result:error(Incorrect login)");
        res.status(400).send("Incorrect login");
      }
    })
    .catch(() => res.status(500).send("Cannot connect to db"));
});

app.post("/updateUser", authenticateToken, (req: Request, res: Response) => {
  logger.log("info", "Post request /updateUser");
  const cityNames: string = req.body.cityNames;
  const username: string = req.body.username;
  firebase
    .database()
    .ref()
    .child(username)
    .update({ cities: cityNames })
    .catch(() => {
      logger.log(
        "error",
        "Post request /updateUser result:Cannot connect to db"
      );
      res.status(500).send("Cannot connect to db");
    });
  logger.log("info", "Post request /updateUser result:Ok");
  res.sendStatus(200);
});

app.post("/getWeatherReport", authenticateToken, (req: Request, res: Response) => {
  logger.log("info", "Post request /getWeatherReport");
  const cityInfo: string[] = req.body.cityInfo.split(",");
  const [cityName, country] = cityInfo;
  const url: string = getOpenWeatherUrl(cityName, country);
  axios.get(url).then(data => {
    logger.log("info", `Post request /getWeatherReport result: send ${data.data}`);
    res.status(200).send(data.data);
  });
});

app.listen(process.env.SERVER_PORT, err => {
  if (err) {
    return err;
  }
});
