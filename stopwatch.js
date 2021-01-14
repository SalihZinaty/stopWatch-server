// stopWatch its a class that generate stopWotches
// there are two main methods on the class
// 1. startWatch - this method let the user start the watch
// stopWatch - this method let the user stop the current watch
class StopWatch {
    constructor(watchNumber) {
        this.startTime = 0;
        this.watchNumber = watchNumber;
        this.stopFlag = true;
        this.startFlag = false;
    }
    start = () => {
        if (!this.startFlag) {
            this.startTime = Date.now();
            this.stopFlag = false;
            this.startFlag = true;
        }
    }
    stop = () => {
        this.startFlag = false;
        if (!this.stopFlag) {
            this.stop = true;
            let elapsedTime = Math.floor(Date.now() - this.startTime);
            let formatted = new Date(elapsedTime).toISOString().substr(11,8);
            return formatted;

        } else {
            return 'the watch already stopped'
        }
    }
}

module.exports = StopWatch;