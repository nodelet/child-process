/*!
 * child-process <https://github.com/nodelet/child-process>
 *
 * Copyright (c) Nivrith
 * Licensed under the MIT License.
 */
import {exec as _exec, spawn as _spawn, ChildProcess, SpawnOptionsWithoutStdio} from 'child_process'
import {Observable, Subscriber, from} from 'rxjs';
import {ChildProcessSubscription} from './subscription';

export function exec(command: string):Observable<{stdout:string, stderr:string}> {
    return Observable.create((subscriber: Subscriber<{stdout:string, stderr:string}>): ChildProcessSubscription =>  {
        let childProcess = _exec(command, (error, stdout, stderr) => {
            if (error) {
                subscriber.error(error);
                return;
                }
                subscriber.next({stdout, stderr});
                subscriber.complete();
        });

        return new ChildProcessSubscription(childProcess);
    });
};

export enum StdioType {
    stdout = 'stdout',
    stderr = 'stderr'
}

export interface ChildProcessMessage {
    message:string|Buffer;
    type: StdioType;
}

export interface SpawnOptions extends SpawnOptionsWithoutStdio {

}
export function spawn(command: string, argv?: string[], options?: SpawnOptions):Observable<ChildProcessMessage> {
    return Observable.create((subscriber: Subscriber<ChildProcessMessage>): ChildProcessSubscription | void  =>  {
        try {
            let childProcess = _spawn(command, argv, options);
            childProcess.on('error', (err)=> {
                subscriber.error(err);
            });

            childProcess.stdout.on('data', (chunk) => {
                subscriber.next({message: chunk, type: StdioType.stdout });
            });

            childProcess.stderr.on('data', (chunk) => {
                subscriber.next({message: chunk, type: StdioType.stderr });
            });

            childProcess.on('exit', (code, signal) => {
                subscriber.error({message:`child process exited with code ${code}`, code, signal});
            });

            childProcess.on('close', (code) => {
                if (code !== 0) {
                    subscriber.error(new Error(`grep process exited with code ${code}`));
                }
            });
            return new ChildProcessSubscription(childProcess);
        }   catch (e) {
            subscriber.next(e);
        }
    });
};

export default {
    exec,
    spawn
};
