import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Message } from  'src/app/chatbot/message';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})

export class MessageListComponent implements OnInit, AfterViewInit {
  @Input('messages')
  messages!: Message[];
  @Input('sessionId') sessionId : any;
  // @Input('agentdetails')
  // agentdetails!: Agentchat;
  @Input('langSelected')
  langSelected!: string;
  isRecording!: boolean;
  @ViewChild('chatlist', { read: ElementRef })
  chatList!: ElementRef;
  @ViewChildren(MessageItemComponent, { read: ElementRef })
  chatItems!: QueryList<MessageItemComponent>;
  @Output() chiplang: EventEmitter<string> = new EventEmitter<string>();
  @Input('deviceType') deviceType: any;
  @Input('voiceAssistState')voiceAssistState!: boolean;
  
  constructor() { }

  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      // console.log('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

  setCurrentLang(currentlang:string){
    this.langSelected = currentlang;
    this.chiplang.emit(this.langSelected);
      }
    
  setVoiceAssist(currentstate:boolean){
    
  }
  ngOnInit(): void {
  }

}
