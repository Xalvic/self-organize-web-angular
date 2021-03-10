import { Component, OnInit } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { take, takeUntil }from'rxjs/operators'

@Component({
  selector: 'app-logtimer',
  templateUrl: './logtimer.component.html',
  styleUrls: ['./logtimer.component.scss']
})
export class LogtimerComponent implements OnInit {

  interval;
  source = timer(0, 1000);
  time = 0;
  inSeconds:any = '00';
  inMinutes:any = '00';
  inHours:any = '00';
  timer: boolean = false;
  startTime;
  subject = new Subject();
//output: 0,1,2,3,4,5......

  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

  formatTime = () => {
    this.inSeconds = `0${(this.time % 60)}`.slice(-2)
    const minutes:any = `${Math.floor(this.time / 60)}`
    this.inMinutes = `0${minutes % 60}`.slice(-2)
    this.inHours = `0${Math.floor(this.time / 3600)}`.slice(-2)
    //console.log(timer);
    console.log(`${this.inHours} : ${this.inMinutes} : ${this.inSeconds}`)
  }

  startTimer() {
    this.timer = true;
    this.startTime = new Date(Date.now())
    this.interval = setInterval(() => {
      this.time = this.time + 1;
      this.formatTime();
    }, 1000)
  }
  //pauseTimer
  stopTimer() {
    this.timer = false;
    clearInterval(this.interval)
    this.time = 0;
    this.inSeconds = 0;
    this.inMinutes = 0;
    this.inHours = 0;
    //this.subject.complete();
  }

  ngOnDestroy() {
    console.log(this.startTime);
    console.log(new Date(Date.now()));
    this.stopTimer();
  }
}

    // this.source.pipe(takeUntil(this.subject)).subscribe(
    //   (val) => {
    //     this.time = val;
    //     this.formatTime();
    //   });
