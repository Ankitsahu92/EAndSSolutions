import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eand-shome',
  templateUrl: './eand-shome.component.html',
  styleUrls: ['./eand-shome.component.scss']
})
export class EAndSHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCardClicked(item: string) {
    const url = item == 'New Client' ? "/Client" : "/Employee";
    this.router.navigate([url])
  }

}
