// stopWatch its a class that generate stopWotches
// there are two main methods on the class
// 1. startWatch - this method let the user start the watch
// stopWatch - this method let the user stop the current watch

class StopWatch {
    constructor(watchNumber){
       this.startTime = 0;
       this.watchNumber = watchNumber;
       this.stopFlag = true;
       this.startFlag = false;
    }
    formatedTime = (time,elapsedTime) => {
        console.log(elapsedTime)
        switch (time){
            case 'hours':
                let hours = Math.floor((elapsedTime/(60*60))).toString();
                if(hours.length === 1) hours = '0' + hours;
                return hours;
            case 'minutes':
                let minutes = Math.floor((elapsedTime/60)).toString();
                if(minutes.length === 1) minutes = '0' + minutes;
                return minutes;
            case 'seconds':
                let seconds = elapsedTime.toString();
                if(seconds.length === 1) seconds = '0' + seconds;
                return seconds;
        }
    }
    start = () => {
        if(!this.startFlag){
            this.startTime = Date.now();
            this.stopFlag = false;
            this.startFlag = true;
        } 
    }
     stop = () => {
         this.startFlag = false;
         if(!this.stopFlag){
            return (Date.now() - this.startTime).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
/*             let elapsedTime =  Math.floor(Date.now()/1000 - this.startTime/1000);
            let hours = this.formatedTime('hours',elapsedTime);
            let minues = this.formatedTime('minutes',elapsedTime);
            let seconds = this.formatedTime('seconds',elapsedTime);
            this.stopFlag = true;
            this.startTime = 0
            return hours + ":" + minues + ":" + seconds */
         } else {
             return 'the watch already stopped'
         }
    }
}

module.exports = StopWatch;