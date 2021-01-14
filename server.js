// the server is written using ExpressJS framework
const express = require('express');
const bodyParser = require('body-parser');
const StopWatch = require('./stopwatch');
 const app = express();
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());

//the lap shared by all the routes;
const lap = {};

 //this API is used to add to the lap new stop watches
app.post('/addWatch',(req,res) => {
    console.log(req.query);
    let watchNum = req.query.name;
    if(lap[watchNum] !== undefined) res.send('This watch is already exists')
    else {
        lap[watchNum] = new StopWatch(watchNum);
        res.send(`watch ${watchNum} was added to the lap`);
    }
})

// starting a selected stop watch
app.post('/startWatch',(req,res) => {
    let watchNum = req.query.name;
    if(lap[watchNum] === undefined) res.send('the watch does not exist in the lap');
    else {
        let watch = lap[watchNum];
        watch.start();
        res.send(`the watch ${watchNum} started tikking`);
    }
})

// stop the selected watch
app.post('/stopWatch',(req,res) => {
    let watchNum = req.query.name;
    if(lap[watchNum] === undefined) res.send('the watch does not exist in the lap');
    else {
        let watch = lap[watchNum];
        res.send(watch.stop());
    }
})

// show the laps 
app.get('/showLap',(req,res) => {
    res.send(lap);
})


 app.listen(3000);
