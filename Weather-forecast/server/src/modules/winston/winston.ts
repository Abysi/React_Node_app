import winston from "winston";

export const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    // - Write all logs below to `winstonLog.log`
    new winston.transports.File({ filename: "winstonLog.log" })
  ]
});
