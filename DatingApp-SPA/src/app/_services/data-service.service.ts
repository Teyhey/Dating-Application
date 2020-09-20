import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private registerBool = new BehaviorSubject(false);
  currentRegisterBool = this.registerBool.asObservable();

  constructor() {}

  toggleRegister(bool: boolean): void {
    this.registerBool.next(bool);
  }
}
