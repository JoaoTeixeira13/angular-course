import { 
  AfterContentChecked, 
  AfterContentInit, 
  AfterViewChecked, 
  AfterViewInit, 
  Component, 
  ContentChild, 
  DoCheck, 
  ElementRef, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChanges, 
  ViewChild, 
  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native are alternatives
})
export class ServerElementComponent implements 
  OnInit,
  OnChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  //allows element to be accessed outside of component. "srvElement" is the alias the applcation recognizes outside of the component
  //with an argument, @Input() would grant access to "element"
  @Input("srvElement") element:{type:string, name:string, content:string};
  @Input() name: string;
  @ViewChild("heading", {static: true}) heading: ElementRef;
  @ContentChild("contentParagraph", {static: true}) paragraph: ElementRef;


  constructor() { 
    console.log("constructor called");
  }

  ngOnChanges(changes:SimpleChanges){
      console.log("ngOnChanges called");
      console.log("changes are", changes);

  }

  ngOnInit(): void {
        console.log("ngOnIt called");
        console.log("text content is",this.heading.nativeElement.textContent);
        console.log("paragraph content is", this.paragraph.nativeElement.textContent);

  }

  ngDoCheck(): void {
    console.log("ngDoCheck called")
  }

  ngAfterContentInit(): void {
        console.log("ngAfterContentInit called");
        console.log("paragraph content is", this.paragraph.nativeElement.textContent);


  }

  ngAfterContentChecked(): void {
        console.log("ngAfterContentChecked called");

  }
  ngAfterViewInit(): void {
        console.log("ngAfterViewInit called");
        console.log("text content is",this.heading.nativeElement.textContent);


  }

  ngAfterViewChecked(): void {
            console.log("ngAfterViewChecked called")

  }

  ngOnDestroy(): void {
    console.log("ngOnDestroyCalled")
  }

}
