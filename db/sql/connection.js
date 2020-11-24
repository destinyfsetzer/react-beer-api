const mysql = require("mysql");
require("dotenv").config();

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: "den1.mysql5.gear.host",
        user: "beerme",
        password: process.env.DB_password,
        database: "beerme",
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;