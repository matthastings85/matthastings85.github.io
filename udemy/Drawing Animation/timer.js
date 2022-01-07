class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.pauseButton = pauseButton;
        this.startButton = startButton;
        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    //The arrow function gets moved up to the constructor. This solves the "this" problem.
    start = () => {
        if(this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick(); //runs the first tick manually so that there isn't a 1 sec delay in starting the timer.
        this.intervalId = setInterval(() => {
            this.tick()
        }, 50);
    };
    pause = () => {
        clearInterval(this.intervalId);
    };

    tick = () => {
        if(this.timeRemaining <= 0) {
            this.pause();
            if(this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining -0.05;
            if(this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    };

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2)
    };
}