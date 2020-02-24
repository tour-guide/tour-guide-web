require("dotenv").config();

module.exports = {
  "development": {
    username: "root",
    password: process.env.DB_PASS,
    database: "tourguide_db",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3306"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.JAWSDB_URL,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
};
