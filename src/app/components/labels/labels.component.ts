import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  @Output() onLabelAdd: EventEmitter<any> = new EventEmitter<any>();

  @Input() toLabels:any;

  labelColor = new FormControl('#0033CC');
  labelName = new FormControl('', Validators.required);

  colors = [
    '#0033CC',
    '#428BCA',
    '#A8D695',
    '#44AD8E',
    '#5CB85C',
    '#69D100',
    '#34495E',
    '#7F8C8D',
    '#A295D6',
    '#5843AD',
    '#8E44AD',
    '#AD4363',
    '#D10069',
    '#CC0033',
    '#FF0000',
    '#D9534F',
    '#D1D100',
    '#F0AD4E',
  ]

  labels = [];

  constructor() { }

  ngOnInit(): void {
    if(this.toLabels.length !== 0) {
      console.log('asda');
      this.labels = this.toLabels;
    }
  }

  // ngAfterViewInit() {

  // }

  setLabelColor(color) {
    this.labelColor.setValue(color);
  }

  addLabel() {
    const data = {
      label: this.labelName.value,
      color: this.labelColor.value
    }
    if(this.labelName.valid) {
      this.labels.push(data);
      this.labelName.setValue('');
      this.onLabelAdd.emit(this.labels);
    }
  }
  removeLabel(data) {
    console.log(data);
    this.labels = this.labels.filter(item => item !== data);
    this.onLabelAdd.emit(this.labels);
  }
  clearLabels() {
    this.labels = [];
    this.onLabelAdd.emit(this.labels);
  }

}
