import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { Message } from  'src/app/chatbot/message';

import { ChatbotService } from '../chatbot-service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input('messages')
  messages!: Message[];
  @Input('message')
  message!: Message;
  @Input('sessionId')
  sessionId:any;
  @Input('langSelected')
  langSelected!: string;
  data:any;
  isRecording!: boolean;
  @Output() chiplang: EventEmitter<string> = new EventEmitter<string>();
  @Output() voiceassist: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('deviceType') deviceType: any;
  myTimeout: any;
  @Input('voiceAssistState') voiceAssistState!: boolean;

  constructor(private chatbotService:ChatbotService) {}

  ngOnInit(): void {
  }

  myTimer(){
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    this.myTimeout = setTimeout(this.myTimer, 10000);
  }

  // onVoiceassistClick(){
  //   this.voiceAssistState = !this.voiceAssistState;
  //   this.voiceassist.emit(this.voiceAssistState);
  // }

  onChipsetClick(selectedChip:any){
      if(selectedChip === 'Malayalam')
             this.chiplang.emit('ml');

     else if(selectedChip === 'Hindi')
              this.chiplang.emit('hi');
      
      else if(selectedChip === 'English')
              this.chiplang.emit('en');
      
              else{
      console.log("Selected Chips:",selectedChip);
      console.log("Language Selected:",this.langSelected);
      this.data = {
       agent_id:'fba268e2-e8da-4493-b3cc-f0409aab03ab',
       session_id:this.sessionId,
       text:selectedChip,
       env_id:"-",
       translate_code:this.langSelected,
       session_end:false
     }
     this.chatbotService.sentAgentMessage(this.data).subscribe(responseData =>{
       if(this.voiceAssistState){
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        this.myTimeout = setTimeout(this.myTimer, 10000);
        // var msg = new SpeechSynthesisUtterance();
        // msg.text = responseData.body?.fullFillmentText;
        var toSpeak = responseData.body?.fullFillmentText;
        var msg = new SpeechSynthesisUtterance(toSpeak);
        msg.lang = this.langSelected;
        // var voices = window.speechSynthesis.getVoices();
        // msg.voice = voices[10]; 
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        // msg.pitch = 2; // From 0 to 2
        if(msg.onend){
          clearTimeout(this.myTimeout);
        }
        window.speechSynthesis.speak(msg);
       // this.voiceAssistState = true;
       } else{
         // Speech Synthesis Not Supported 😣
         alert("Sorry, your browser doesn't support text to speech!");
       }
      }
     // console.log("responseData.body?.fullFillmentText",responseData.body?.fullFillmentText)
      let splitstrings = responseData.body?.fullFillmentText.toString().split("\n");
      console.log("Splitstrings:",splitstrings);
      this.messages.push(
        new Message('bot',splitstrings,responseData.body?.options,'assets/bot.jpg')
     );
    // console.log("ChatResponse..",responseData);
    // this.isFetching= false;
   });
    }
  }

}
