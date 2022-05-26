import { Component, Input, OnInit,OnDestroy, Output} from '@angular/core';
import { Message } from  'src/app/chatbot/message';
import {VoicerecognisionService} from "../voicerecognision.service"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { ChatbotService } from '../chatbot-service';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  public searchForm!: FormGroup;
  public isUserSpeaking: boolean = false;
  isFetching = false;
  data:any;
  voicetext:string = '';
  @Input('sessionId')
  sessionId!: any;
  @Input('agentdetails')
// agentdetails!: Agentchat;
  @Input('message') message!: Message;
  @Input('messages') messages!: Message[];
  @Output() langChanged: EventEmitter<string> =  new EventEmitter<string>();
  @Output() recStarted:  EventEmitter<boolean> = new EventEmitter<boolean>();
  voiceSub!: Subscription;
  @Input('langSelect') langSelect:string='';
  @Input('deviceType') deviceType: any;
  @Input('voiceAssistState') voiceAssistState!: boolean;
  myTimeout: any;
  richContent!: any[];
  accordianText!: string;
  constructor(private fb: FormBuilder,
   private voiceRecognition: VoicerecognisionService,private chatbotService:ChatbotService) {
      this.searchForm = this.fb.group({
        searchText: ['', Validators.required],
      });
    }

    ngOnInit(): void {
      this.initVoiceInput();
      // this.voiceRecognition.setlanguage(this.langSelect);
      // console.log("Select Language,:",this.langSelect);
    }
     /**
     * @description Function to stop recording.
     */
    stopRecording() {
      this.voiceRecognition.stop();
      this.isUserSpeaking = false;
    }

    deleteRecording() {
      this.voiceRecognition.stop();
      this.isUserSpeaking = false;
      this.voicetext = '';
    }
  
    /**
     * @description Function for initializing voice input so user can chat with machine.
     */
    initVoiceInput() {
      // Subscription for initializing and this will call when user stopped speaking.
      this.voiceRecognition.init().subscribe(() => {
        // User has stopped recording
        // Do whatever when mic finished listening
      });
      // Subscription to detect user input from voice to text.
      this.voiceRecognition.speechInput().subscribe((input) => {
       // this.voicetext = input
        //this.messages.push( new Message('user',[input],'','assets/user.jpg'));
      });
    }
  
    /**
     * @description Function to enable voice input.
     */
    startRecording() {
      this.isUserSpeaking = true;
      this.recStarted.emit(this.isUserSpeaking);
      this.voiceRecognition.start();
      this.voiceSub = this.voiceRecognition.voiceToTextSubject.subscribe(text =>{
        console.log("Voicetext",text);
        this.voicetext = text;
       })
    }

    // public setLanguage(event:any){
    //   this.voiceRecognition.setlanguage(this.langSelect);
    //  // this.langChanged.emit(event.value);
    // }
    myTimer(){
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
      this.myTimeout = setTimeout(this.myTimer, 10000);
    }

    public sendVoiceMessage(): void {
    //  this.voiceRecognition.setlanguage(this.langSelect);
      this.stopRecording();
      if(this.voicetext){
        this.messages.push(
          new Message('user',[this.voicetext],'','assets/user.jpg')
        );
      }
      console.log("SessionId",this.sessionId);
        // if(this.langSelect== ''){
        //   this.langSelect='en'
        // }
       // console.log("hiiiiiiiiiiiiiiiiiii");
         this.data = {
          agent_id:'fba268e2-e8da-4493-b3cc-f0409aab03ab',
          session_id:this.sessionId,
          text: this.voicetext,
          env_id:'-',
          translate_code:this.langSelect,
          session_end:false
        }
      
    //  else{
    //   if(this.langSelect== ''){
    //     this.langSelect='en'
    //   }
    //    this.data = {
    //     agent_id:this.agentdetails.agentid,
    //     session_id:this.sessionId,
    //     text: this.voicetext,
    //     env_id:this.agentdetails.envid,
    //     translate_code:this.langSelect,
    //     session_end:false
    //   }
    //  }
    //  this.message.timestamp = new Date();
    console.log("messagesss",this.message);
      this.isFetching= true;
      let splitstrings: string[];
      this.chatbotService.sentAgentMessage(this.data).subscribe(responseData =>{
        // console.log(this.richContent);
        // this.richContent = responseData.body?.payload.richContent;
        //  var designNames:any[] = this.richContent[0]
        //  this.accordianText = designNames[0].text;
       // var designNames = this.richContent.map(data => data['text']);
        //this.richContent = myData;
       // var designNames = myData.map(['text']);
        // for(let i=0;i<this.richContent.length;i++){
        //   var designNames = this.richContent.map(data => data['text']);
        //   //var inner:any[]=this.richContent[i];
        //   // for(let j =0;j<inner.length;j++){
        //   //   this.accordianText = inner[j].text; 
        //   // }
        //   console.log("accordianText",designNames);
        // }
      //   for(let inner of this.richContent){
      //     for(let accordian of inner){
      //       this.accordianText = accordian.text;
      //     }
      //  }
       //console.log("accordianText",this.accordianText);
        if(this.voiceAssistState === true ){
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          this.myTimeout = setTimeout(this.myTimer, 10000);
         // var msg = new SpeechSynthesisUtterance();
         // voices = window.speechSynthesis.getVoices();
         // msg.text = responseData.body?.fullFillmentText;
          var toSpeak = responseData.body?.voice_msg;
          console.log(responseData.body?.voice_msg);
          var msg = new SpeechSynthesisUtterance(toSpeak);
          msg.lang = this.langSelect;
           //var voices = window.speechSynthesis.getVoices();
          // msg.voice = voices[10]; 
          msg.volume = 1; // From 0 to 1
          msg.rate = 1; // From 0.1 to 10
          // msg.pitch = 2; // From 0 to 2
          msg.rate = 1; // From 0.1 to 10
          // msg.voice = voices[10];
          if(msg.onend){
            clearTimeout(this.myTimeout);
          }
          window.speechSynthesis.speak(msg);
         } else{
           // Speech Synthesis Not Supported 😣
           alert("Sorry, your browser doesn't support text to speech!");
         }
        }
        // if(responseData.body?.fullFillmentText===""){
        //   if(this.langSelect=="en"){
        //     let response = "Please enter recognisable input"
        //     splitstrings = response.toString().split("\n");
        //   }

        //   if(this.langSelect=="hi"){
        //     let response = "कृपया पहचानने योग्य इनपुट दर्ज करें"
        //     splitstrings = response.toString().split("\n");
        //   }

        //   if(this.langSelect=="ml"){
        //     let response = "ദയവായി തിരിച്ചറിയാവുന്ന ഇൻപുട്ട് നൽകുക"
        //     splitstrings = response.toString().split("\n");
        //   }
        // }
      //   else{
      //  splitstrings = responseData.body?.fullFillmentText.toString().split("\n");
      //   }
  
        // console.log("Splitstrings:",splitstrings);
         this.messages.push(
           new Message('bot',responseData.body?.fullFillmentText,responseData.body?.payload.richContent,'assets/bot.jpg')
        );
        console.log("ChatResponse..",responseData);
        this.isFetching= false;
      });
      this.message = new Message('user',[],"",'assets/user.jpg');
    }

  public sendMessage( ): void {
  //  this.voiceRecognition.setlanguage(this.langSelect);
    if(this.message.content.length !== 0){
      this.messages.push(
        this.message
       // new Message('user',this.message,'','assets/user.jpg')
      );
    }
   // this.message.content = [textInput];
    console.log("SessionId",this.sessionId);
         
      console.log("hiiiiiiiiiiiiiiiiiii");
       this.data = {
        agent_id:'fba268e2-e8da-4493-b3cc-f0409aab03ab',
        session_id:this.sessionId,
        text: this.message.content,
        env_id:"-",
        translate_code:this.langSelect,
        session_end:false
      }
  //  else{
  //   if(this.langSelect== ''){
  //     this.langSelect='en'
  //   }
  //    this.data = {
  //     agent_id:this.agentdetails.agentid,
  //     session_id:this.sessionId,
  //     text: this.message.content,
  //     env_id:this.agentdetails.envid,
  //     translate_code:this.langSelect,
  //     session_end:false
  //   }
  //  }
  //  this.message.timestamp = new Date();
  console.log("messagesss",this.message);
    this.isFetching= true;
    let splitstrings: string[];
    if(this.message.content.length !== 0){
    this.chatbotService.sentAgentMessage(this.data).subscribe(responseData =>{
      console.log("Selected language:",this.langSelect);
      if(this.voiceAssistState === true){
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        this.myTimeout = setTimeout(this.myTimer, 10000);
        //var msg = new SpeechSynthesisUtterance();
       // msg.text = responseData.body?.fullFillmentText;
       var toSpeak = responseData.body?.voice_msg;
       var msg = new SpeechSynthesisUtterance(toSpeak);
        msg.lang = this.langSelect;
        var voices = window.speechSynthesis.getVoices();
        // var voices = window.speechSynthesis.getVoices();
        // msg.voice = voices[10]; 
       // msg.voice = voices[10];
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        if(msg.onend){
          clearTimeout(this.myTimeout);
        }
         window.speechSynthesis.speak(msg);
        // // msg.pitch = 2; // From 0 to 2
        // let speechInerval = setInterval(() => {
        //   console.log(speechSynthesis.speaking);
        //   if (!speechSynthesis.speaking) {
        //     clearInterval(speechInerval);
        //   } else {
        //     speechSynthesis.resume();
        //   }
        // }, 14000);
       }else{
         // Speech Synthesis Not Supported 😣
         alert("Sorry, your browser doesn't support text to speech!");
       }
      }
    //   if(responseData.body?.fullFillmentText===""){
    //   let response = "Please enter recognisable input"
    //  splitstrings = response.toString().split("\n");
    //   }
    //   else{
    //  splitstrings = responseData.body?.fullFillmentText.toString().split("\n");
    //   }
      // console.log("Splitstrings:",splitstrings);
      this.messages.push(
        new Message('bot',responseData.body?.fullFillmentText,responseData.body?.payload.richContent,'assets/bot.jpg')
     );
      console.log("ChatResponse..",responseData);
      this.isFetching= false;
    });
    this.message = new Message('user',[],"",'assets/user.jpg');
  }
  }
}
function myTimeout(myTimeout: any) {
  throw new Error('Function not implemented.');
}

