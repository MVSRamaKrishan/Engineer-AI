import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscribable, Subscription, interval } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  modalRef: BsModalRef;
  result: any;
  userFilter: any = { title: '' };
  subscription: Subscription;
  config: any = {
    class: 'modal-xl modal-dialog-centered',
  }

constructor(private serviceModalRef: BsModalService,private homeService: HomeService) { }

ngOnInit(): void {
    this.homeService.getData().subscribe(resp => {
      this.result = resp['hits'];
      console.log(this.result);
      const source = interval(10000);
      this.subscription = source.subscribe(val => this.printConsole(this.result));
    });
  }

openModal(template: TemplateRef<any>) {
    this.modalRef = this.serviceModalRef.show(template, this.config);
  }

printConsole(val) {
    console.log(val);
  }
}
