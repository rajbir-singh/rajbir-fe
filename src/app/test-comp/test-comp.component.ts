import { Component, OnInit } from '@angular/core';
// ng g component testComp --spec=false
@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
