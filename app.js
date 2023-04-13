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
        const result = await request.query('SELECT * FROM Franchise');
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
            const result = await request.query('SELECT Rank,RestaurantName,Category.RestaurantType FROM Restaurant,Category Where Restaurant.RestaurantID = Category.RestaurantID');
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
            const result = await request.query('SELECT Rank,RestaurantName,Category.RestaurantType FROM Restaurant,Category Where Restaurant.RestaurantID = Category.RestaurantID');
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
            const result = await request.query('SELECT Top 50 Rank,RestaurantName,Category.RestaurantType FROM Restaurant,Category Where Restaurant.RestaurantID = Category.RestaurantID ORDER BY Category.RestaurantType');
            res.render ("C_Cat", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
    }
)

app.get ( "/Sales.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Rank,RestaurantName,Sales,YOY_Sales FROM Restaurant,Sales where Restaurant.RestaurantID = Sales.RestaurantID;');
            res.render ("Sales", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
    }
)

app.get ( "/Franchise.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Rank,RestaurantName,Units,YOY_Units FROM Restaurant,Franchise where Restaurant.RestaurantID = Franchise.RestaurantID;');
            res.render ("Franchise", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
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