export class Message {
    type?:string
    content: string[];
   // voicetext:string;
    chipset?:any[];
    avatar: string;

    constructor(type:string,content: string[],chipset:any,avatar: string){
      this.type = type;
      this.content = content;
      this.chipset = chipset;
      this.avatar = avatar;
    }
  }
  