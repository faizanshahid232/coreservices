const express = require('express');
const app = express();
app.listen(process.env.PORT || 3000);
const cors = require('cors');

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

app.listen(5000, () => {
    console.log("Running on port 5000.");
});

module.exports = app;