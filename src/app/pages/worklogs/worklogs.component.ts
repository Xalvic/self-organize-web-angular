import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { CreateService } from '../../services/create.service';
import { FormControl, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
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
  ]
})
export class WorklogsComponent implements OnInit {
  textInput = new FormControl('', Validators.required);
  loader:boolean = false;
  playButton: boolean = false;
  labelBoolean: boolean = false;

  labels = [];
  labelCount:number;

  data = [];

  constructor(
    private _list: ListService,
    private _create: CreateService,
    public newSelector: ElementRef,
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this._list.getLogs().subscribe(
      (res) => {
        this.data = res;
        this.data.forEach(element => {
          element.menuBool = false;
        });
        console.log(this.newSelector.nativeElement.querySelector('#logs'));
        this.loader = false;
        console.log(this.data);
      },
      (err) => {
        this.loader = false;
        console.log(err);
      }
    )
  }

  //! Add Label Trigger
  openLabels() {
    this.labelBoolean = !this.labelBoolean;
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
    // console.log("hello");
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
