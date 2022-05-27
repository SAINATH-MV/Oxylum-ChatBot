import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { MessageListComponent} from './message-list/message-list.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { Message } from './message';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
// import { AgentChatComponent} from "src/app/admin/pages/agent-chat/agent-chat.component"
// import { Agentchat } from "src/app/admin/pages/agent-chat/chat.model"
import { ChatbotService } from './chatbot-service';
import { VoicerecognisionService } from './voicerecognision.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent implements OnInit {
 
  public message : Message;
  public messages!: Message[];
  //public agentdetails!: Agentchat;
  public sessionId = Math.random();
  private agentchatSub!: Subscription;
  messagedata : any;
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  selectedlang: string = "";
  isRecording!: boolean;
  breakpoint!: number;
  @Input('deviceType') deviceType:any;
  //@Output() voiceassist: EventEmitter<boolean> = new EventEmitter<boolean>();
  voiceAssistState: boolean = true;
  languageSelected:string = "";
  panelOpenState = true;

  constructor(private voiceRecognition: VoicerecognisionService,
     private chatbotService:ChatbotService){
   this.message = new Message('user',[],"",'src/assets/user.jpg');
   let stringarray:string = "Hi I am Bot"
   if(this.selectedlang === "" ||'en'){
    this.messages = [
      new Message('bot',['Hello, Please select a language.'],
      [
        [{"options":[
          {"text":'English'},{"text":'हिन्दी'},{"text":'മലയാളം'},{"text":'ಕನ್ನಡ'}
        ],
      "type":"chips"}
      ]
    ]    
        ,'assets/bot.jpg')
    ];   
   }
  //  if(this.selectedlang === 'hi'){
  //   this.messages = [
  //     new Message('bot',['हाय मैं बोटा हूँ'],"",'assets/bot.jpg')
  //   ];   
  //  }
  
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('user has been inactive for 3 minutes'));
  }

  setTimeout() {
    this.userActivity = setTimeout(() =>{
      this.userInactive.next(undefined)
       this.dialogChatClose()
    },180000);
  }

  onVoiceassistClick(){
    window.speechSynthesis.cancel();
    this.voiceAssistState = !this.voiceAssistState;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnInit() {
    //  this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
   //console.log("Selectedlang",this.langSelect)
  //  this.agentdetails = new Agentchat(this.data.dataKey.agentid,this.data.dataKey.envid,this.data.dataKey.agentname,this.data.dataKey.agentlang);
  //  this.agentchatSub = this.productService.setchat.subscribe(agentchat =>{
  //   console.log("agentfgf:",agentchat.agentid,agentchat.envid,agentchat.agentname);
  //  this.agentdetails = new Agentchat(agentchat.agentid,agentchat.envid,agentchat.agentname);
  // });
  }

  // onResize(event:any) {
  //   this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  // }

  ngOnDestroy() {
    // this.agentchatSub.unsubscribe();
   }

  setCurrentLang(currentlang:string){
    this.selectedlang = currentlang;
    this.voiceRecognition.setlanguage(this.selectedlang);
    if(this.selectedlang=='ml')
    this.languageSelected='മലയാളം'
    
    else if(this.selectedlang=='hi')
    this.languageSelected="हिन्दी"

    else if(this.selectedlang=='kn')
    this.languageSelected="ಕನ್ನಡ"

     else
    this.languageSelected="English"
  }

  recodringStarted(isrecording:boolean){
    this.isRecording = isrecording;
  }

  dialogChatClose(){
      this.messagedata = {
       agent_id:"f1d514f2-c895-4964-b3b1-bc601be2cf28",
       session_id:this.sessionId,
       text: this.message.content,
       env_id:"-",
       translate_code:this.selectedlang,
       session_end:false
      }
 
  //   this.messagedata = {
  //    agent_id:this.agentdetails.agentid,
  //    session_id:this.sessionId,
  //    text: this.message.content,
  //    env_id:this.agentdetails.envid,
  //    translate_code:this.selectedlang,
  //    session_end:false
  //  }
    this.chatbotService.sentAgentMessage(this.messagedata).subscribe(responseData =>{
    // console.log("ChatResponse..",responseData);
    // this.isFetching= false;
   });
  }
}
