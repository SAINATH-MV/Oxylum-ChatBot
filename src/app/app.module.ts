// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { MatChipsModule } from '@angular/material/chips'; 
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { ChatbotComponent } from 'src/app/chatbot/chatbot.component';
import { MessageFormComponent } from 'src/app/chatbot/message-form/message-form.component';
import { MessageItemComponent }  from 'src/app/chatbot/message-item/message-item.component';
import { MessageListComponent }  from  'src/app/chatbot/message-list/message-list.component';
// import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MaterialModule } from '../app/material.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { CreateCustomerComponent } from './admin/pages/create-customer/create-customer.component';
// import { LoginComponent } from './shared/login/login.component';
// import { AdminSidenavComponent } from './shared/admin-sidenav/admin-sidenav.component';
// import { AdminSidenavStepperComponent } from './shared/admin-sidenav-stepper/admin-sidenav-stepper.component';
// import { AgentComponent } from './agent/agent.component';
// import { BillingComponent } from './billing/billing.component';
// import { HeaderComponent } from './shared/header/header.component'
// import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
// import { AdminCustomersComponent } from './admin/pages/admin-customers/admin-customers.component';
// import { StylePaginatorDirective } from './admin/pages/admin-customers/style-paginator.directive'
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { AdminCustomerComponent } from './admin/pages/admin-customer/admin-customer.component';
// import { AdminComponent } from './shared/admin/admin.component';
// import { AdminToolbarComponent } from './shared/admin-toolbar/admin-toolbar.component';
// import { AdminAgentComponent } from './admin/pages/admin-agent/admin-agent.component';
// import { ChatbotComponent } from './shared/chatbot/chatbot.component';
// import { MessageFormComponent } from './shared/chatbot/message-form/message-form.component';
// import { MessageItemComponent } from './shared/chatbot/message-item/message-item.component';
// import { MessageListComponent } from './shared/chatbot/message-list/message-list.component';
// import { AdminBillingComponent } from './admin/pages/admin-billing/admin-billing.component';
// import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
// import { MainNavComponent } from './main-nav/main-nav.component';
// import { AdminCallogsComponent } from './admin/pages/admin-callogs/admin-callogs.component';
// import { AdminCustomerdComponent } from './admin/pages/admin-customerd/admin-customerd.component';
// import { AdminAgentuploadComponent } from './admin/pages/admin-agentupload/admin-agentupload.component';
// import { MatSortModule } from '@angular/material/sort';
// import { MatSnackBarModule} from '@angular/material/snack-bar';
// import { AdminMessagelogsComponent } from './admin/pages/admin-messagelogs/admin-messagelogs.component';
// import { AdminAgentsComponent } from './admin/pages/admin-agents/admin-agents.component';
// import { KnowledgedocUploadComponent } from './admin/pages/admin-customerd/knowledgedoc-upload/knowledgedoc-upload.component';
// import { AdminKnowledgedocsComponent } from './admin/pages/admin-customerd/admin-knowledgedocs/admin-knowledgedocs.component';
// import { AuthAdminComponent } from './auth/auth-admin/auth-admin.component';
// import { AuthCustomerComponent } from './auth/auth-customer/auth-customer.component';
// import { AuthInterceptorService } from './auth/auth-admin/auth-interceptor.service';
// import {CookieService} from 'ngx-cookie-service';
// import { AgentChatComponent } from './admin/pages/agent-chat/agent-chat.component';
// import {MatMenuModule} from '@angular/material/menu';
 import { MatKeyboardModule } from 'angular-onscreen-material-keyboard';
 import { FlexLayoutModule } from  '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    MessageFormComponent,
    MessageItemComponent,
    MessageListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
   // NgChartsModule
   MatCheckboxModule,
   MatKeyboardModule,
   MatGridListModule,
   FlexLayoutModule,
   HttpClientModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

