const mssql = require('mssql');

const config = {
  user: 'sa',
  password: 'admin123456',
  server: 'localhost',
  database: 'Restaurant_Business_Rankings_2020',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    }
};

const pool = new mssql.ConnectionPool(config);

pool.connect((err) => {
    if(err){
        console.error("error: " + err)
        return;
    }
    console.log("connected")
})
module.exports = pool
