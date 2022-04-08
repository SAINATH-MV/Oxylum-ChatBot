import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'OxylymChat';
  mediaSub!: Subscription;
  deviceType:any;
 constructor(public mediaObserver:MediaObserver){

 }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
   this.deviceType = result.mqAlias;
   console.log(result.mqAlias);
    })
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
 
}
