import { Component, OnInit, Renderer2, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LogsService } from '../_services/logs.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.css']
})
export class PageDashboardComponent implements OnInit, OnDestroy {

  errorLogs: number;
  successLogs: number;
  logs: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private logService: LogsService
  ) { }

  ngOnInit(): void {
    this.logsWithError();
    this.logsWithSuccess();
    this.allLogs();
    this.generateGraphic();

    this.renderer.setAttribute(this.document.body, 'data-col', '2-columns');
    this.renderer.addClass(this.document.body, '2-columns');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, '2-columns');
    this.renderer.removeAttribute(this.document.body, 'data-col');
  }

  logsWithError() {
    this.logService.loadStatistics(true).subscribe(x => {
      this.errorLogs = x;
    });
  }

  logsWithSuccess() {
    this.logService.loadStatistics(false).subscribe(x => {
      this.successLogs = x;
    });
  }

  allLogs() {
    this.logService.loadStatistics().subscribe(x => {
      this.logs = x;
    });
  }

  generateGraphic() {

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const successByDay = [];
    const errorByDay = [];


    this.logService.loadStatisticsByRange(startDate, new Date()).subscribe(logs => {

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        let counterSuccess = 0;
        let counterError = 0;

        logs.forEach(log => {
          const logDate: Date = new Date(log.LogDate);
          logDate.setHours(0, 0, 0, 0);

          if (logDate.getDate() === date.getDate()) {
            if (log.LogStatusName === 'SUCCESS') {
              counterSuccess++;
            } else {
              counterError++;
            }
          }
        });
        successByDay.push(counterSuccess);
        errorByDay.push(counterError);
      }

      const lineArea = new Chartist.Line('#line-area', {
        labels: [1, 2, 3, 4, 5, 6, 7],
        series: [
          errorByDay,
          successByDay
        ]
      }, {
          low: 0,
          showArea: true,
          fullWidth: true,
          axisY: {
            low: 0,
            scaleMinSpace: 50,
          },
          axisX: {
            showGrid: false
          }
        });

      lineArea.on('created', data => {
        const defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 255, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(146, 254, 157, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient1',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
      });
    });

  }



}
