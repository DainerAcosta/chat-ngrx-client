import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  
  socket: Socket;

  constructor() {
    this.socket = io(environment.socket.baseUrl, environment.socket.config);
  }

  public newMessage$() {
    return new Observable(observer => {
      try {
        
        this.socket.on('connection', () => {
          console.log('WS: Connected');
        });

        this.socket.on('count', (data) => {
          observer.next(data);
        });

        this.socket.on('disconnect', () => {
          console.warn('WS: Disconnected!');
          observer.complete();
        });

        this.socket.on('error', (error) => {
          console.log('WS: Error!');
          observer.error(error);
        });

        this.socket.on('connect_error', (error) => {
          console.log('WS: Connect error');
          observer.error(error);
        });

        return () => {
          console.log('Observable completed!');
          this.socket.disconnect();
        };
        
      } catch (error) {
        observer.error(error);
      }
    });
  }
}

