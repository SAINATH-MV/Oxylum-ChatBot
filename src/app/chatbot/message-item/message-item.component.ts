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
  @Input('deviceType') deviceType: any;

  constructor(private chatbotService:ChatbotService) {}

  ngOnInit(): void {
  }

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
       agent_id:'f1d514f2-c895-4964-b3b1-bc601be2cf28',
       session_id:this.sessionId,
       text:selectedChip,
       env_id:"273fad2e-4be2-439f-9573-9da9f9fcc7c8",
       
       translate_code:this.langSelected,
       session_end:false
     }
     this.chatbotService.sentAgentMessage(this.data).subscribe(responseData =>{
      if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = responseData.body?.fullFillmentText;
        msg.lang = this.langSelected;
        // var voices = window.speechSynthesis.getVoices();
        // msg.voice = voices[10]; 
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        // msg.pitch = 2; // From 0 to 2
        window.speechSynthesis.speak(msg);
       } else{
         // Speech Synthesis Not Supported 😣
         alert("Sorry, your browser doesn't support text to speech!");
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
