// the server is written using ExpressJS framework
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const StopWatch = require('./stopwatch');
const { watch } = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'start secret' }));

const sessions = {};
//this API is used to add to the lap new stop watches
app.post('/addWatch', (req, res) => {
    let watchNum = req.query.name;

    if (sessions[req.sessionID] && (sessions[req.sessionID][watchNum] !== undefined)) res.send(`This watch is already exists`)
    else {
        let lap = {};
        lap[watchNum] = new StopWatch(watchNum);
        sessions[req.sessionID] = {
            ...sessions[req.sessionID],
            ...lap
        }
        console.log(sessions[req.sessionID]);
        res.send(`watch ${watchNum} was added to the lap`);
    }
})

// starting a selected stop watch
app.post('/startWatch', (req, res) => {
    let watchNum = req.query.name;
    if (sessions[req.sessionID] && (sessions[req.sessionID][watchNum] === undefined)) res.send('the watch does not exist in the lap');
    else {
        let watch = sessions[req.sessionID][watchNum];
        watch.start();
        res.send(`the watch ${watchNum} started tekking`);
    }
})

// stop the selected watch
app.post('/stopWatch', (req, res) => {
    let watchNum = req.query.name;
    if (sessions[req.sessionID][watchNum] === undefined) res.send('the watch does not exist in the lap');
    else {
        let watch =sessions[req.sessionID][watchNum];
        res.send(watch.stop());
    }
})

// show the laps 
app.get('/showLap', (req, res) => {
    res.send(sessions[req.sessionID]);
})


app.listen(3000);
