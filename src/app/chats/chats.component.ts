import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WebsocketService, WebsocketModule, WebSocketConfig } from './websocket';
import { WS } from './websocket.events';
import { config } from './websocket/websocket.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface IMessage {
  id: number;
  text: string;
  author: string;
  date: string;
}

type NewType = FormGroup;

@Component({
  selector: 'mi-element-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  private messages$: Observable<IMessage[]>;
  private counter$: Observable<number>;
  private texts$: Observable<string[]>;

  public form: NewType;

  constructor(
    private fb: FormBuilder,
    private wsService: WebsocketService,
    @Inject(config) private wsConfig: BehaviorSubject<WebSocketConfig>
  ) {

  }

  ngOnInit() {
    this.wsConfig.next({url: 'ws://localhost:8080'});
      this.form = this.fb.group({
        text: [null, [
          Validators.required
        ]]
      });
    // get messages
    this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);

    // get counter
    this.counter$ = this.wsService.on<number>(WS.ON.COUNTER);

    // get texts
    this.texts$ = this.wsService.on<string[]>(WS.ON.UPDATE_TEXTS);
  }

  public sendText(): void {
    console.log(this.form.value);
    // if (this.form.valid) {
    //     this.wsService.send(WS.SEND.SEND_TEXT, this.form.value.text);
    //     this.form.reset();
    // }
  }

  public removeText(index: number): void {
    this.wsService.send(WS.SEND.REMOVE_TEXT, index);
  }


}
