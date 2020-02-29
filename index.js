const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient


var bodyParser = require("body-parser");
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home')
})
app.post('/myroute' , (req,res) => {
    console.log(req.body)
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, { useUnifiedTopology: true }).then((db) => {
        const form = db.db("form")
        const accountholder = form.collection("accountholder")
        accountholder.insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        
    }).catch((err) => console.log(err))
    res.render('home')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))