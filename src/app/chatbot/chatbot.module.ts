import { NgModule } from "@angular/core";
import { ChatbotComponent } from './chatbot.component';
import { MatChipsModule } from '@angular/material/chips'; 
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        ChatbotComponent 
    ],
    imports:[RouterModule,CommonModule,FormsModule],
    exports:[
        ChatbotComponent   
    ]
})

export class ChatbotModule{}