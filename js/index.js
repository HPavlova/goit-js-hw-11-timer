const refs = {
  start: document.getElementById('timer-1'),
  daysSpan: document.querySelector('[data-value="days"]'),
  hoursSpan: document.querySelector('[data-value="hours"]'),
  minsSpan: document.querySelector('[data-value="mins"]'),
  secsSpan: document.querySelector('[data-value="secs"]'),
};

console.log(refs);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalID = null;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    const startTime = this.targetDate;
    // console.log(startTime);

    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      const time = this.getTimeComponents(deltaTime);
      console.log(time);

      this.updateClockFace(time);
      this.stop(deltaTime);
    }, 1000);
  }

  stop(time) {
    if (this.time <= 0) {
      clearInterval(this.intervalID);
    }
  }

  updateClockFace({ days, hours, mins, secs }) {
    refs.daysSpan.textContent = `${days}`;
    refs.hoursSpan.textContent = `${hours}`;
    refs.minsSpan.textContent = `${mins}`;
    refs.secsSpan.textContent = `${secs}`;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 01, 2022'),
});

timer.start();
