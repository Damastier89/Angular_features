import { Component, OnInit } from '@angular/core';
import * as $ from '../node_modules/jquery/dist/jquery.min.js';
// import $ from '../../../../../node_modules/jquery/dist'
let $ = require('./../../../../../node_modules/jquery/dist/jquery.js');
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  const currentyear = new Date().getFullYear();
  const thischristmasyear = (new Date().getMonth() == 0 && new Date().getDate()==1) ? this.currentyear : this.currentyear + 1 ; 
  const christmas=`january 1, ${this.thischristmasyear} 0:0:00`;
  const currentTime: any = new Date();
  const targetdate: any = new Date(this.christmas);  		
  const timediff = (this.targetdate - this.currentTime) / 1000;
  const oneMinute = 60;
  const oneHour = 60 * 60;
  const oneDay = 60 * 60 * 24;
  const dayfield = Math.floor(this.timediff / this.oneDay);
  const hourfield = Math.floor((this.timediff - this.dayfield * this.oneDay) / this.oneHour);
  const minutefield = Math.floor((this.timediff - this.dayfield * this.oneDay - this.hourfield * this.oneHour) / this.oneMinute);
  const secondfield = Math.floor((this.timediff - this.dayfield * this.oneDay - this.hourfield * this.oneHour - this.minutefield * this.oneMinute));
  $(function(){
    $('.c-block:eq(0) .bl-inner span').text(this.dayfield);
    $('.c-block:eq(1) .bl-inner span').text(this.hourfield);
    $('.c-block:eq(2) .bl-inner span').text(this.minutefield);
    $('.c-block:eq(3) .bl-inner span').text(this.secondfield);
  });

  constructor() { }

  ngOnInit(): void {
    this.timer('.timer', '2022-12-31')
  }

  public timer(id: string, deadLine: string) {

    function getTimeRemaining(endtime: any) {
      const t: any = Date.parse(endtime) - Date.parse(new Date().toString()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)), // кол-во милисекунд в дне
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
  
      return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
      };
    }
  
    function getZero(num: any) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }
  
    function setClock(selector: any, endtime: any) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
  
      updateClock();
  
      function updateClock() {
        const t = getTimeRemaining(endtime);
  
        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);
  
        if (t.total <= 0) {
          clearInterval(timeInterval);
        };
      }
    };
  
    setClock(id, deadLine);
  
  };

}
