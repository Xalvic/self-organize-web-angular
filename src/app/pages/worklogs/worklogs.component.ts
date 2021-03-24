import { Component, OnInit, HostListener } from '@angular/core';
import { ListService } from '../../services/list.service';
import { CreateService } from '../../services/create.service';
import { FormControl, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-worklogs',
  templateUrl: './worklogs.component.html',
  styleUrls: ['./worklogs.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('stagger', [
      transition('void => *', [ 
        query(':enter', [
            style({ opacity: 0, 'transform': 'translateY(-100%)' }),
            stagger('100ms', [
              animate('150ms', style({ opacity: 1, 'transform': 'translateY(-4%)' })),
              animate('150ms', style({ opacity: 1, 'transform': 'translateY(0%)' }))
            ])
          ], { optional: true }
        )
      ]),
      transition('* => void', [ 
        query(':leave', [
            style({ opacity: 1, 'transform': 'translateY(0%)' }),
            stagger('100ms', [animate('300ms', style({ opacity: 0, 'transform': 'translateY(100%)' }))])
          ], { optional: true }
        )
      ])
    ])
  ]
})
export class WorklogsComponent implements OnInit {
  today = new Date().toString().split(' ')[2];
  textInput = new FormControl('', Validators.required);
  filterButton = 0;
  loader:boolean = false;
  playButton: boolean = false;
  labelBoolean: boolean = false;
  moblabelBoolean: boolean = false
  mobInputBoolean: boolean = false;

  labels = [];
  labelCount:number;

  screenHeight;
  screenWidth;
  weekDays = [];
  weekFirst;
  weekLast;
  monthFirst;
  monthLast;
  temp: boolean = false;
  showLogs: boolean = false;

  data = [];

  mobButtons = [
    {
      class:'fab fa-airbnb'
    },
    {
      class:'fab fa-accusoft'
    },
    {
      class:'fas fa-air-freshener'
    },
    {
      class:'fas fa-air-freshener'
    },
  ]

  constructor(
    private _list: ListService,
    private _create: CreateService,
    public newSelector: ElementRef,
  ) { 
      this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.loader = true;
    this.getThisWeek();
    this.getWeekDays(new Date());
    this.callLogs(0);
  }

  tempAdd() {
    this.temp = !this.temp;
  }

  toggleFilter(e) {
    if(this.filterButton === 0 || e !== this.filterButton) {
      this.filterButton = e;
    } else if(e === this.filterButton) {
      this.filterButton = 0;
    }

  console.log(this.filterButton);
    if(this.filterButton == 0) {
      this.callLogs(0);
    } else if(this.filterButton == 1) {
      this.callLogs(1);
    } else if(this.filterButton == 2) {
      this.callLogs(2);
    }
  }

  callLogs(num) {
      //this.showLogs = false;
      this._list.getLogs(num, this.weekFirst, this.weekLast, this.monthFirst, this.monthLast).subscribe(
        (res) => {
          this.data = res;
          if(res.length != 0) {
            this.showLogs = true;
          } else {
            this.showLogs = false;
          }
          this.data.forEach(element => {
            element.menuBool = false;
          });
          // console.log(this.newSelector.nativeElement.querySelector('#logs'));
          this.loader = false;
          console.log(this.data);
        },
        (err) => {
          this.loader = false;
          console.log(err);
        }
      )
  }

  getThisWeek() {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();

    let first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6
    //toUTCString()
    this.monthFirst = new Date(y, m, 1);
    this.monthLast = new Date(y, m + 1, 0);
    this.weekFirst = new Date(date.setDate(first));
    this.weekLast = new Date(date.setDate(last));
    // console.log(this.weekFirst, this.weekLast);
    // console.log(this.monthFirst, this.monthLast);
  }

  selectDay(day) {
    if(day.is_active) {
      this.weekDays.forEach((elm) => {
        if(day.date == elm.date) {
          elm.toggle = true;
          this.showLogs = false;
          this._list.getLogs(1, day.date, day.date, this.monthFirst, this.monthLast).subscribe(
            (res) => {
              this.data = res;
              if(res.length != 0) {
                this.showLogs = true;
              } else {
                this.showLogs = false;
              }
              this.data.forEach(element => {
                element.menuBool = false;
              });
              this.loader = false;
              console.log(this.data);
            },
            (err) => {
              this.loader = false;
              console.log(err);
            }
          )
        } else {
          elm.toggle = false;
        }
      })
    }
  }

  getWeekDays(current) {
    let week= new Array(); 

    current.setDate((current.getDate() - current.getDay() +1));
      for (let i = 0; i < 7; i++) {
          let data = {
            date: new Date(current).toString(),
            day: new Date(current).toString().split(' ')[0],
            dayNum: new Date(current).toString().split(' ')[2],
            toggle: false,
            is_active: false,
          }
          if(this.today == current.toString().split(' ')[2]) {
            data.toggle = true;
          }
          week.push(data); 
          current.setDate(current.getDate() +1);
    }

    week.slice(0, (week.findIndex(elm => elm.dayNum == new Date().toString().split(' ')[2])+1)).forEach(v => {
      v.is_active = true;
    });

    this.weekDays = week;
    console.log(this.weekDays);
    return week;
  }

  //!Mob Input Container
  openMobInput() {
    this.mobInputBoolean = !this.mobInputBoolean;
  }
  //! Add Label Trigger
  openLabels() {
    this.labelBoolean = !this.labelBoolean;
  } 
  mobopenLabels() {
    this.moblabelBoolean = !this.moblabelBoolean;
  } 
  // ! Recive Labels
  public recieve(labels: any):void {
    this.labels = labels;
    this.labelCount = labels.length;
  }

  //! Start Timer Trigger
  timeStart() {
    this.playButton = !this.playButton;
  }

  menuToggle(id) {
    this.data.map((log: any) => {
      if (log._id === id) { log.menuBool = !log.menuBool }
      return log;
    })
  }

  closeDropdown(id) {
    this.data.map((log: any) => {
      if (log._id === id) { log.menuBool = false; }
      return log;
    })
  }

  submitLogKey(e) {
    if(e.keyCode === 13) {
      this.submitLog();
    }
  }
  submitLog() {
      if(this.textInput.valid) {
        let body = {
          log: this.textInput.value,
          labels: this.labels,
        }
        this._create.postLog(body).subscribe(
          (res) => {
            console.log(res);
            this.textInput.setValue('');
            this.labels = [];
            this.labelCount = 0;
            this.mobInputBoolean = false;
            this.ngOnInit();
            //this.newSelector.nativeElement.querySelector('#logs').scrollIntoView({ behavior: 'smooth', block: 'center' });
          },
          (err) => {
            console.log(err);
          }
        );
      }
  }

  deleteLog(id) {
    this._create.deleteLog(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
