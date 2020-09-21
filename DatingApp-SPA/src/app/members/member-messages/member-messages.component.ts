import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MemberMessagesComponent implements OnInit, AfterViewInit {
  @ViewChild('chat', { read: ElementRef }) public chat: ElementRef<any>;
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
    this.scrollToBottom();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
  }

  loadMessages(): void {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap((messages: Message[]) => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < messages.length; i++) {
            if (
              messages[i].isRead === false &&
              messages[i].recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, messages[i].id);
            }
          }
        })
      )
      .subscribe(
        (messages) => {
          this.messages = messages;
          this.messages.reverse();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  sendMessage(): any {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
          this.messages.reverse();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
