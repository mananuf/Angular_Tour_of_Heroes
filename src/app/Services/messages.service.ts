import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message:string[] = [] // stores message as string

  constructor() { }

  add(msg:string){
    this.message.push(msg) // store message to cache
  }

  clear(){
    this.message = [] // clear cache
  }
}
