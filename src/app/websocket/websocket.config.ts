import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebSocketConfig } from '.';

export const config: InjectionToken<string> = new InjectionToken<BehaviorSubject<WebSocketConfig>>(undefined);
