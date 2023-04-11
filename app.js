var express = require( "express" );
const pool = require("./database");

var app = express();

app.set ( "view engine", "ejs" );

const person = [{
    name: 'Kevin',
    age: 17,
    canCook: true,
}, {
    name: 'Gavin',  
    age: 19,
    canCook: true,
}, {
    name: 'Sean',
    age: 10,
    canCook: false,
}];


app.get('/users', async (req, res) => {
    try {
      const request = pool.request();
      const result = await request.query('SELECT * FROM Restaurant');
      res.send(result.recordset);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error retrieving users from database');
    }
  });
  


app.get( "/", function (req, res)
    {
        res.render ("homepage", {
            person,
        });
    }
)

app.get ( "/Category.ejs", function (req, res)
    {
        res.render ( "Category" );
    }
)

app.get ( "/Sales.ejs", function (req, res)
    {
        res.render ( "Sales" );
    }
)

app.get ( "/Franchise.ejs", function (req, res)
    {
        res.render ( "Franchise" );
    }
)

app.get ( "/Reference.ejs", function (req, res)
    {
        res.render ( "Reference" );
    }
)

app.listen (8081, "127.0.0.2",()=> {
    console.log("URL: http://127.0.0.2:8081");
} );