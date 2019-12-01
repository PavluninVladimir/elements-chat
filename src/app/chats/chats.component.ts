import { Component, OnInit, Inject, Input } from '@angular/core';
import * as Shortid from 'shortid';
import { Observable, BehaviorSubject } from 'rxjs';
import { WebsocketService, WebSocketConfig } from '../websocket';
import { WS } from './websocket.events';
import { config } from '../websocket/websocket.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Datasource, IDatasource } from 'ngx-ui-scroll';

export interface IMessage {
  text: string;
  user: string;
}

@Component({
  selector: 'mi-element-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})

export class ChatsComponent implements OnInit {
  @Input('url-server') urlServer: string;
  @Input('chat-name') chatName: string;

  form: FormGroup;
  sbj = new BehaviorSubject<IMessage[]>(undefined);
  datasource: IDatasource;

  private messages$: Observable<IMessage[]>;
  private counter$: Observable<number>;
  private userName: string;

  constructor(
    private wsService: WebsocketService,
    @Inject(config) private wsConfig: BehaviorSubject<WebSocketConfig>
  ) {
    this.form = new FormGroup({
      userMessages: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.wsConfig.next({ url: this.urlServer});
    this.userName = Shortid.generate();

    this.datasource = new Datasource({
      get: (index, count) => {
        return this.getDataObservable(index, count);
      },
      settings: {
        startIndex: 1,
        minIndex: 1,
        bufferSize: 5,
      }
    });

    // get messages
    this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);

    // get counter
    this.counter$ = this.wsService.on<number>(WS.ON.COUNTER);
    this.messages$.subscribe(r => {
      this.sbj.next(r);
      this.datasource.adapter.reload(r.length > 6 ? r.length : 0);
    });
    // get texts
    this.wsService.status.pipe(filter(connect => connect)).subscribe(() => {
      this.wsService.send(WS.SEND.FIND_ALL_MESSAGE, {});
    });
  }

  public sendMess(): void {
    const message: IMessage = {
      user: this.userName,
      text: this.form.controls['userMessages'].value,
    };
    this.form.reset();
    this.wsService.send(WS.SEND.SEND_TEXT, message);
  }

  getDataObservable(index: number, count: number): Observable<any> {
    return this.sbj.pipe(map(x => {
      if (Array.isArray(x)) {  
        const start = index-1;
        const end = index + count - 1;
        return x.slice(start, end);
      }
    }));
  }

  public removeText(index: number): void {
    this.wsService.send(WS.SEND.REMOVE_TEXT, index);
  }

  public notifyMe() {
    // Проверка поддержки браузером уведомлений
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // Если разрешено, то создаем уведомление
      const notification = new Notification('Появилось новое сообщение!');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // Если пользователь разрешил, то создаем уведомление
        if (permission === 'granted') {
          const notification = new Notification('Появилось новое сообщение!');
        }
      });
    }

    // В конечном счете, если пользователь отказался от получения
    // уведомлений, то стоит уважать его выбор и не беспокоить его
    // по этому поводу.
  }

}
