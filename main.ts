import fetch, { Response } from "node-fetch";
import https from "https";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/* 
Read data from https://swapi.dev/api/people/1 (Luke Skywalker)
and dependent data from swapi to return the following object

{
    name: 'Luke Skywalker',
    height: 172,
    gender: 'male',
    homeworld: 'Tatooine',
    films: [
        {
            title: 'A New Hope',
            director: 'George Lucas',
            release_date: '1977-05-25'
        },
        ... // and all other films
    ]
}

Define an interface of the result type above and all other types as well.

*/

interface Person {
  name: string;
  height: string;
  gender: "male" | "female" | "divers";
  homeworld: string;
  films: string[];
}

export interface PersonInfo {
  // TODO: define type
}

// Task 1: write a function using promise based fetch api
type PromiseBasedFunction = () => Promise<PersonInfo>;
export const getLukeSkywalkerInfo: PromiseBasedFunction = () => {
  return fetch("https://swapi.dev/api/people/1").then((response: Response) => {
    return response.json().then((person: Person) => {
      // TODO: load other stuff and return LukeSkywalkerInfo
      return {} as PersonInfo;
    });
  });
};

// Task 2: write a function using async and await
// see also: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html
type AsyncBasedFunction = () => Promise<PersonInfo>;
export const getLukeSkywalkerInfoAsync: PromiseBasedFunction = async () => {
  const response = await fetch("https://swapi.dev/api/people/1");
  // TODO: load other stuff and return LukeSkywalkerInfo
  return (await {}) as PersonInfo;
};

// Task 3: write a function using callback https.get
// see also: https://nodejs.org/api/https.html#httpsgetoptions-callback
type CallbackBasedFunction = (callback: (res: PersonInfo) => void) => void;
export const getLukeSkywalkerInfoCallback: CallbackBasedFunction = (
  callback
) => {
  https.get("https://swapi.dev/api/people/1", (response) => {
    let body: string = "";
    response.on("data", (data) => {
      body += data;
    });
    response.on("end", () => {
      const person: Person = JSON.parse(body); // JSON.parse(body) parses a string to an object
      callback({} as PersonInfo);
    });
  });
};

// Task 4: write a function using Observable based api
export const getLukeSkywalkerInfoObservable = () => {
  return fetch$<Person>("https://swapi.dev/api/people/1").pipe(
    // use mergeMap() when the call returns an observable,
    // e.g. mergeMap(person => fetch$('url').pipe(map(res => ...)))
    map(person => {}),
    map(() => {
      return {} as PersonInfo
    })
  );
};


// simulates a fetch call returning an observable
const fetch$ = <T>(url: string) => {
  return new Observable((subscriber) => {
    fetch(url)
      .then((response) =>
        response.json().then((data) => {
          subscriber.next(data);
          subscriber.complete();
        })
      )
      .catch((err) => subscriber.error(err));
  });
};
