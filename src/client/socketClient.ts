import { Observable } from "rxjs";

import socketIo from "socket.io-client";

const SERVER_URL = "/";

export default class SocketService {
  constructor() {
    this.initSocket();
  }

  private socket;

  private initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(channel: string, message: any): void {
    this.socket.emit(channel, message);
  }

  public onMessage<T = any>(channel): Observable<T> {
    return new Observable<T>(observer => {
      this.socket.on(channel, (data: T) => observer.next(data));
      return () => {
        this.socket.off(channel);
      };
    });
  }

  public onEvent(event: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
