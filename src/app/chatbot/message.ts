export class Message {
    type?:string
    content: string[];
   // voicetext:string;
   // richtype?:string;
    richcontent?:any[];
    avatar: string;

    constructor(type:string,content:string[],chipset:any,avatar: string){
      this.type = type;
      this.content = content;
     // this.richtype = dstype;
      this.richcontent = chipset;
      this.avatar = avatar;
    }
  }
  