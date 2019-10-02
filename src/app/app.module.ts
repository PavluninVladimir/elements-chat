import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { NgModule, Injector } from '@angular/core';
import { ChatsComponent } from './chats/chats.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WebsocketModule } from './chats/websocket';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { CustomIconRegistry } from './custom-icon-registry';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
  ],
  declarations: [
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    WebsocketModule.config({
        url: 'ws://localhost:8080'
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [MatIconRegistry],
  entryComponents: [ChatsComponent]
})
export class AppModule {
  constructor(private injector: Injector, public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    const customButton = createCustomElement(ChatsComponent, { injector });
    customElements.define('mi-element-chats', customButton);
  }

  ngDoBootstrap() {}
 }
