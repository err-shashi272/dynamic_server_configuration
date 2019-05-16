require("winston-daily-rotate-file");

const winston = require("winston");

winston.loggers.add("logger", {
  transports: [
    //new files will be generated each day, the date patter indicates the frequency of creating a file.
    new winston.transports.DailyRotateFile({
      name: "debug-log",
      filename: "logs/debug.log",
      level: "debug",
      prepend: true,
      datePattern: "YYYY-MM-DD",
      maxFiles: 10
    }),
    new winston.transports.DailyRotateFile({
      name: "error-log",
      filename: "logs/error.log",
      level: "error",
      prepend: true,
      datePattern: "YYYY-MM-DD",
      maxFiles: 10
    })
  ]
});

const logger = winston.loggers.get("logger");
Object.defineProperty(exports, "LOG", { value: logger });
