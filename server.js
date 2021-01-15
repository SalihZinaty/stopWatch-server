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
const cors = require('cors');
const StopWatch = require('./stopwatch');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'start secret'
}));
app.use(cors());
const sessions = {};

app.get('/', (req, res) => {
    res.send('<p><h3>welcome to stop-watch server please add a stop watch</h3>this server gives you the ability to do:<p>1. add a new stop watch to the lap using the API: /addwatch?name=THE_NAME_OF_THE_STOPWATCH</p><p>2. start an existing stop watch using the API: /startwatch?name=THE_NAME_OF_THE_STOPWATCH</p><p>3. stop an existing stop watch using the API: /stopwatch?name=THE_NAME_OF_THE_STOPWATCH</p><p>4. show all the stop watches that exists in the lap using the API: /showlap</p></p>')
})
app.get('/currtime',(req,res) => {
    let currTime = new Date();
    res.send(currTime.toLocaleTimeString());
})
app.get('/addwatch', (req, res) => {
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
        //console.log(sessions[req.sessionID]);
        res.send(`watch ${watchNum} was added to the lap with session: ${req.sessionID}`);
    }
})

// starting a selected stop watch
app.get('/startwatch', (req, res) => {
    let watchNum = req.query.name;
    if (sessions[req.sessionID] === undefined || (sessions[req.sessionID] && (sessions[req.sessionID][watchNum] === undefined)))
        res.send('the watch does not exist in the lap');
    else {
        let watch = sessions[req.sessionID][watchNum];
        watch.start();
        res.send(`the watch ${watchNum} started tekking`);
    }
})

app.get('/stopwatch', (req, res) => {
    let watchNum = req.query.name;
    if (sessions[req.sessionID] === undefined || (sessions[req.sessionID] && (sessions[req.sessionID][watchNum] === undefined)))
        res.send('the watch does not exist in the lap');
    else {
        let watch = sessions[req.sessionID][watchNum];
        res.send(watch.stop());
    }
})  

// show the laps 
app.get('/showlap', (req, res) => {
    let watchLap = {};
    for (let watch in sessions[req.sessionID]) {
        watchLap[watch] = sessions[req.sessionID][watch].stop('showlap');
    }
    res.send(watchLap);
})


app.listen(process.env.PORT || 3000);
