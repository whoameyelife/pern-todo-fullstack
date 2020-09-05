const Pool = require("pg").Pool;

const pool = new Pool({
  user: "shravan",
  password: "shravan",
  host: "localhost",
  database: "perntodo",
  port: 5432,
});

module.exports = pool;
