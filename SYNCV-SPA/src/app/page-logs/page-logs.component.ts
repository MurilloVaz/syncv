import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { LogsService } from '../_services/logs.service';
import { Pagination } from '../_interfaces/Pagination';
import { Log } from '../_interfaces/Log';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-page-logs',
  templateUrl: './page-logs.component.html',
  styleUrls: ['./page-logs.component.css']
})
export class PageLogsComponent implements OnInit, OnDestroy {
  pagination: Pagination = { currentPage: 1, itemsPerPage: 10 };
  logs: Log[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private logService: LogsService,
  ) { }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadLogs();
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.document.body, 'data-col', '2-columns');
    this.renderer.addClass(this.document.body, '2-columns');
    this.loadLogs();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, '2-columns');
    this.renderer.removeAttribute(this.document.body, 'data-col');
  }

  loadLogs(): void {
    this.logService.loadLogs(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(x => {
      this.pagination = x.pagination;
      this.logs = x.result;
    });
  }

}
