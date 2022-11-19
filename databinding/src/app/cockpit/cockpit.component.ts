import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // EventEmitter
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output("bpCreated") blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';

  //accessible via "nativeElement"
  @ViewChild("serverContentInput", {static: true}) servercontentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput : HTMLInputElement) {
    console.log("this server content input is",this.servercontentInput);
    console.log("name input is", nameInput.value)
   this.serverCreated.emit({
    serverName: nameInput.value,
    serverContent: this.servercontentInput.nativeElement.value
  });
  }

  onAddBlueprint(nameInput : HTMLInputElement) {
   this.blueprintCreated.emit({
    serverName: nameInput.value,
    serverContent: this.servercontentInput.nativeElement.value
  });
  }

}
