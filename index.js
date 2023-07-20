const express = require('express');
const app = express();
//app.listen(process.env.PORT || 3000);
const cors = require('cors');
app.use(express.static('public'));
// This is your test secret API key.
//app.use(express.static("public"));
app.use(express.json());

var whitelist = [
    'https://payment-ten-sooty.vercel.app/',
    'http://localhost:3001/'
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors());

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return items;
  };

  const ingredients = [
    {
        "id": "1",
        "item": "Bacon"
    },
    {
        "id": "2",
        "item": "Eggs"
    },
    {
        "id": "3",
        "item": "Milk"
    },
    {
        "id": "4",
        "item": "Butter"
    }
];

app.get('/ingredients', cors(), (req, res, next) =>{
    res.send(ingredients);
});

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://payment-ten-sooty.vercel.app/');
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const url = 'https://carboncompensate.starcb.com/api/v1';
    fetch(url, {
        headers: {
            "Authorization": "CPF5A58B2108704667ACABF945230F0D61:WQ3ibsd3EQfNuvQmoLR5ygrd8mCUVfSuk47fufXs8Jnziu5fIeXFDXVFPPhJRiq2",
        },
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        res.status(200).json('This has CORS enabled 🎈'+ data)
    })
    
});

const stripe = require("stripe")('sk_test_51NOz1fIi4beyPjru1XAPSAdxY1x8zH8fJMOghajQGbgq2SVgE3R2tLTj8fhoZ8kCJHq7wX0PKgstks4S6NUBwRYA006SNgD679');

app.post("/create-payment-intent", async (req, res) => {
    console.log("request body",req.body);
    res.set('Access-Control-Allow-Origin', 'https://payment-ten-sooty.vercel.app/');
    
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader("Content-Type", "application/json")
    
     const {items} = req.body;
      // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: items,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("Payment:", paymentIntent.client_secret);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      
    });
  });

  app.post('/cors-post', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://payment-ten-sooty.vercel.app/');
    
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const url = 'https://carboncompensate.climatepositive.com/api/v1/calculate';
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "CPF5A58B2108704667ACABF945230F0D61:WQ3ibsd3EQfNuvQmoLR5ygrd8mCUVfSuk47fufXs8Jnziu5fIeXFDXVFPPhJRiq2",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body.json),
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        res.send(data)
    })
    
})

app.post('/cors-post-email', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://payment-ten-sooty.vercel.app/');
    
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    console.log(req.body);
    const url = 'https://carboncompensate.climatepositive.com/api/v1/vend';
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "CPF5A58B2108704667ACABF945230F0D61:WQ3ibsd3EQfNuvQmoLR5ygrd8mCUVfSuk47fufXs8Jnziu5fIeXFDXVFPPhJRiq2",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body.mergedObj),
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        res.send(data)
    })
    
})
app.listen(5000, () => {
    console.log("Running on port 5000.");
});

//module.exports = app;