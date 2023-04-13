var express = require( "express" );
const pool = require("./database");
const bodyParser = require ("body-parser");

var app = express();

app.set ( "view engine", "ejs" );
app.use(bodyParser.urlencoded ({extended: false}));


app.post ("/Search.ejs", async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * from Restaurant');
        if (req.body.search == "") {
            res.render ("homepage", {
                result,
            });
        }
        else{
            result.recordset.forEach(async function(row){
                if (row.RestaurantName == req.body.search){
                    var Name = row.RestaurantName
                    const Final_result = await request.query(`SELECT Restaurant.RANK, Restaurant.RestaurantName, Category.RestaurantType, Sales.Sales, Sales.YOY_Sales, Franchise.Units, Franchise.YOY_Units FROM Restaurant JOIN Category ON Restaurant.RestaurantID = Category.RestaurantID JOIN Sales ON Restaurant.RestaurantID = Sales.RestaurantID JOIN Franchise ON Restaurant.RestaurantID = Franchise.RestaurantID WHERE Restaurant.RestaurantName = '${Name.replace("'", "''")}'`);
                    res.render ("Search", {
                        Final_result,
                    })
                }
            })
        }
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

app.get ( "/S_Sale.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Rank,RestaurantName,Sales,YOY_Sales FROM Restaurant,Sales where Restaurant.RestaurantID = Sales.RestaurantID;');
            res.render ("S_Sale", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
    }
)

app.get ( "/Y_Sale.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Rank,RestaurantName,Sales,YOY_Sales FROM Restaurant,Sales where Restaurant.RestaurantID = Sales.RestaurantID order by Sales.YOY_Sales DESC;');
            res.render ("Y_Sale", {
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

app.get ( "/U_Fran.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Rank,RestaurantName,Units,YOY_Units FROM Restaurant,Franchise where Restaurant.RestaurantID = Franchise.RestaurantID order by Franchise.Units DESC;');
            res.render ("U_Fran", {
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        }
    }
)

app.get ( "/Y_Fran.ejs", async (req, res) =>
    {
        try {
            const request = pool.request();
            const result = await request.query('SELECT Rank,RestaurantName,Units,YOY_Units FROM Restaurant,Franchise where Restaurant.RestaurantID = Franchise.RestaurantID order by Franchise.YOY_Units DESC;');
            res.render ("Y_Fran", {
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