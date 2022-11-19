import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>
  // `,
  templateUrl:"./servers.component.html",
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "No server was created!";
  serverName= "TestServer";
  userName = "";
  serverCreated = false;
  servers = ["TestServer", "TestServer2"];
  showSecret = false;
  log = [];


  constructor() { 
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
  }

  ngOnInit(): void {

  }
  onCreateServer() {
      this.serverCreated = true;
      this.servers.push(this.serverName);
      this.serverCreationStatus = "Server was created! Name is " + this.serverName;
    }
  onUpdateServerName(event: Event) {
      this.serverName = (<HTMLInputElement>event.target).value;      
    }

  onUpdateUserName(event: Event) {

      this.userName = (<HTMLInputElement>event.target).value;      
    }

  onResetUser() {
    this.userName = "";
  }

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date());

  }
  


}
