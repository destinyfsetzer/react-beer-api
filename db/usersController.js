const mysql = require("mysql");
const pool = require("./sql/connection");
const { handleSQLError } = require("./sql/error");

const list = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const show = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  const id = req.params.id;
  console.log(id);
  let sql = `SELECT ?? FROM ?? WHERE ?? = ?`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["*", "users", "id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const create = (req, res) => {
  let newUser = req.body;
  let first = newUser.firstName;
  let last = newUser.lastName;
  let email = newUser.email;
  let userName = newUser.userName;
  let password = newUser.password;

  // INSERT INTO USERS FIRST AND LAST NAME
  let sql = "INSERT INTO users (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
  // WHAT GOES IN THE BRACKETS???
  sql = mysql.format(sql, [
    "users",
    "firstName",
    "lastName",
    "email",
    "userName",
    "password",
    `${first}`,
    `${last}`,
    `${email}`,
    `${userName}`,
    `${password}`,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

module.exports = { list, show, create };
