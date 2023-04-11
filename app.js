var express = require( "express" );
const pool = require("./database");
const bodyParser = require ("body-parser");

var app = express();

app.set ( "view engine", "ejs" );
app.use(bodyParser.urlencoded ({extended: false}));


app.post ("/Search", async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * from Restaurant');
        result.recordset.forEach(function(row){
            if (row.RestaurantName == req.body.search){
                var Name = row.RestaurantName
                res.render ("Search", {
                    result,Name,
                })
                res.send(row.RestaurantName);
            }
        })
      } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving users from database');
      }
})


app.get('/users', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT Rank from Restaurant');
        res.send(result.recordset);
      } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving users from database');
      }
  });
  


app.get( "/", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Rank,RestaurantName from Restaurant ORDER by Rank');
            res.render ("homepage", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
    }
)

app.get ( "/Category.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Top 50 Rank,RestaurantName,Category.RestaurantType FROM Restaurant,Category Where Restaurant.RestaurantID = Category.RestaurantID');
            res.render ("Category", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
    }
)

app.get ( "/R_Cat.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Top 50 Rank,RestaurantName,Category.RestaurantType FROM Restaurant,Category Where Restaurant.RestaurantID = Category.RestaurantID');
            res.render ("R_Cat", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
    }
)

app.get ( "/C_Cat.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Top 50 Rank,RestaurantName,Category.RestaurantType FROM Restaurant,Category Where Restaurant.RestaurantID = Category.RestaurantID');
            res.render ("C_Cat", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
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