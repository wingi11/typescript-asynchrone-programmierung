import { Observable } from "rxjs";
import fetch from "node-fetch";

export type CallbackBasedFunction<T> = (
  callback: (res: T) => void,
  error: (err: Error) => void
) => void;

// simulates a fetch call returning an observable
export const get = <T>(url: string) => {
  return new Observable((subscriber) => {
    fetch(url)
      .then((response) =>
        response.json().then((data) => {
          subscriber.next(data);
          subscriber.complete();
        })
      )
      .catch((err) => subscriber.error(err));
  }) as Observable<T>;
};


