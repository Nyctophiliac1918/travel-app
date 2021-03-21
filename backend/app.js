const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const express= require("express");
const cors = require('cors');
const createError = require('http-errors');
const Graph = require("./graph");
const PriorityQueue = require("./queue");
dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.nnzew.mongodb.net/snapwizDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

const dealSchema = new mongoose.Schema({
    transport:String,
    departure:String,
    arrival:String,
    duration:{
        h:String,
        m:String
    },
    cost:Number,
    discount:Number,
    reference:String
})

const Deal = new mongoose.model('Deal', dealSchema);

let map = new Graph();

const removeDuplicatesFromArray = (arr) =>
    [...new Set(arr.map((el) => JSON.stringify(el)))].map((e) => JSON.parse(e));

app.get('/', function(req, res){
    res.send("Hello from the backend");
})

app.get("/places", function(req,res){

    Deal.find(function(err, result){

        if(err){
            res.send(err);
        }
        else
        {
            let nodes = result.map((opt) => ({
                city: opt.departure
            }));

            removeDuplicatesFromArray(nodes).forEach((node) => map.addNode(node.city));
            result.forEach(function(place){
                var dur = Number(place.duration.h)*60+Number(place.duration.m);
                var money = Math.max(0,place.cost-place.discount);
                map.addEdge(place.departure, place.arrival, dur, money, place.transport);
            });

            res.send(removeDuplicatesFromArray(nodes));
        }
    })

})

app.post("/find-route", function(req,res){
    const route = {
        src:req.body.src,
        dest:req.body.dest,
        choice:req.body.choice
    }

    //console.log(route);

    if(route.src === route.dest)
    {
        throw createError(400, `Choose different cities`)
        return;
    }

    if(route.choice === "Fastest")
        res.send(map.findFastestPathWithDijkstra(route.src, route.dest));
    else res.send(map.findCheapestPathWithDijkstra(route.src, route.dest));

})

app.listen(process.env.PORT || 8081, function(){
    console.log('Server started at Port 8081:');
});