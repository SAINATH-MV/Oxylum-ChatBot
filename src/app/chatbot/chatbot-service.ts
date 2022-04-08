import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }
  sentAgentMessage(data: any) {
    //   var headers = new HttpHeaders({
    //     "Content-Type":"application/json",
    //     "Accept": '*/*'
    // });
       return this.http
           .post<any>('https://test.bicaneer.in/voice/webhooks/chatbot',data,
           { observe: 'response' })
           .pipe(
            map((responseData)=>{
              return responseData;
             })
             );
       }
}
