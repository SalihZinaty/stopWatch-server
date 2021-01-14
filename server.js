/* This server built with ExpressJS framework
** every user enter the server get a cookie - this happened with the session meddleWare
** there are 4 endpoints:
** a. /addWatch - the user can add a watch to the Lap
** b. /startWatch - the user can start a watch
** c. /stopWatch - the user can stop a specific watch and show how mutch time elapsed
** d. /showLap - the user can peek to all the lap
** the user enter a url query: ?name=value - the value is the name of the watch the user wants to use
** example : 
*****  localhost:3000/addWatch?name=1
*****  localhost:3000/startWatch?name=1
*****  localhost:3000/stopWatch?name=1 --> this should response with hh:mm:ss
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const StopWatch = require('./stopwatch');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'start secret' }));

const sessions = {};
//this API is used to add to the lap new stop watches
app.post('/addWatch', (req, res) => {
    let watchNum = req.query.name;
    if (sessions[req.sessionID] && (sessions[req.sessionID][watchNum] !== undefined))
        res.send(`This watch is already exists`)
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
    if (sessions[req.sessionID] === undefined || (sessions[req.sessionID] && (sessions[req.sessionID][watchNum] === undefined)))
        res.send('the watch does not exist in the lap');
    else {
        let watch = sessions[req.sessionID][watchNum];
        watch.start();
        res.send(`the watch ${watchNum} started tekking`);
    }
})

// stop the selected watch
app.post('/stopWatch', (req, res) => {
    let watchNum = req.query.name;
    if (sessions[req.sessionID] === undefined || (sessions[req.sessionID] && (sessions[req.sessionID][watchNum] === undefined)))
        res.send('the watch does not exist in the lap');
    else {
        let watch = sessions[req.sessionID][watchNum];
        res.send(watch.stop());
    }
})

// show the laps 
app.get('/showLap', (req, res) => {
    let watchLap = {};
    for(let watch in sessions[req.sessionID]){
        watchLap[watch] = sessions[req.sessionID][watch].stop();
    }
    res.send(watchLap);
})


app.listen(3000);
