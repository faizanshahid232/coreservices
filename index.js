const express = require('express');
const app = express();
app.listen(process.env.PORT || 3000);
const cors = require('cors');
// This is your test secret API key.


app.use(express.static("public"));
app.use(express.json());

var whitelist = [
    '*',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

/*const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return items;
  };*/

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

const stripe = require("stripe")('sk_test_51NOz1fIi4beyPjru1XAPSAdxY1x8zH8fJMOghajQGbgq2SVgE3R2tLTj8fhoZ8kCJHq7wX0PKgstks4S6NUBwRYA006SNgD679');

app.post("/create-payment-intent", cors(), async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { items } = req.body;
      console.log("here1", items);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
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

app.listen(5000, () => {
    console.log("Running on port 5000.");
});

module.exports = app;