import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedData:DataService) { }

  inputValue:string;
  ngOnInit(): void {
  }

  searchChanged()
  {
    //alert(this.inputValue);
    this.sharedData.editMsg(this.inputValue);
  }

  onKey(event) {this.inputValue = event.target.value;
    this.sharedData.setMessage(this.inputValue);
  }
}
