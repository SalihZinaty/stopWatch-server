// stopWatch its a class that generate stopWotches
// there are two main methods on the class
// 1. startWatch - this method let the user start the watch
// stopWatch - this method let the user stop the current watch
class StopWatch {
    constructor(watchNumber) {
        this.startTime = 0;
        this.watchNumber = watchNumber;
        this.stopFlag = true; // this flag meant to not start the same watch twice
        this.startFlag = false; //this flag meant to not stop the watch twice
    }
    start = () => {
        if (!this.startFlag) {
            this.startTime = Date.now(); // getting the current time and store it in the startTime private param
            this.stopFlag = false;
            this.startFlag = true;
        }
    }
    stop = () => {
        this.startFlag = false;
        if (!this.stopFlag) {
            this.stopFlag = true;
            let elapsedTime = Math.floor(Date.now() - this.startTime); // calculating the elapsed time
            let formatted = new Date(elapsedTime).toISOString().substr(11,8); // send back formatted time : hh:mm:ss
            return formatted;

        } else {
            return 'the watch already stopped'
        }
    }
}

module.exports = StopWatch;