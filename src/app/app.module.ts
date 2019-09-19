import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { NgModule, Injector } from '@angular/core';
import { ChatsComponent } from './chats/chats.component';

@NgModule({
  declarations: [
    ChatsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [ChatsComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(ChatsComponent, { injector });
    customElements.define('mi-element-chats', customButton);
  }

  ngDoBootstrap() {}
 }
