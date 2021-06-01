import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BRQ-SPA';

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, ) { }

  ngOnInit(): void {
    const loader = this.document.getElementById('preloader');
    this.document.body.removeChild(loader);
    this.renderer.removeClass(this.document.body, 'preLoad');
  }

  show() {
    if (this.router.url === '/login' || this.router.url === '/register') {
      return false;
    }
    return true;
  }
}
