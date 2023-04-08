const sql = require("msnodesqlv8");

const connectionString = "sever=.;Database=Restaurant_Business_Rankings_2020;Trusted_Connection=Yes;Driver={SQL Sever Native Clint 11.0}";
const query = "SELECT * from Fraanchise";

sql.query(connectionString, query, (err, rows) => {
    console.log(rows);
});