import {Subscription} from 'rxjs';
import { ChildProcess } from 'child_process';

export class ChildProcessSubscription extends Subscription {
  constructor(private childProcess: ChildProcess){
    super();
  }
  get pid(){
    return this.childProcess.pid;
  }

  unsubscribe() {
    this.childProcess.removeAllListeners();
    this.childProcess.unref();
  }
}