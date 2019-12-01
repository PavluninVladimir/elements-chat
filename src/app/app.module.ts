import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { NgModule, Injector } from '@angular/core';
import { ChatsComponent } from './chats/chats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebsocketModule, config, WebSocketConfig } from './websocket';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { UiScrollModule } from 'ngx-ui-scroll';
import { BehaviorSubject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';


// import { CustomIconRegistry } from './custom-icon-registry';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    
  ],
  declarations: [
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    WebsocketModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    UiScrollModule,
    MatMenuModule
  ],
  providers: [MatIconRegistry,
    { provide: config, useValue: new BehaviorSubject<WebSocketConfig>({url: ''})}
  ],
  entryComponents: [ChatsComponent]
})
export class AppModule {
  constructor(private injector: Injector, public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    const elementChats = createCustomElement(ChatsComponent, { injector });
    customElements.define('mi-element-chats', elementChats);
  }

  ngDoBootstrap() {}
 }
