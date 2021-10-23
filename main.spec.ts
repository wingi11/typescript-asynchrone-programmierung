import { cold, hot } from 'jest-marbles';

import {
  getLukeSkywalkerInfo,
  getLukeSkywalkerInfoAsync,
  getLukeSkywalkerInfoCallback,
  getLukeSkywalkerInfoObservable,
  PersonInfo,
} from "./main";

const expectedResult: PersonInfo = {
  name: "Luke Skywalker",
  height: "172",
  gender: "male",
  homeworld: "Tatooine",
  films: [
    {
      title: "A New Hope",
      director: "George Lucas",
      release_date: "1977-05-25",
    },
    {
      title: "The Empire Strikes Back",
      director: "Irvin Kershner",
      release_date: "1980-05-17",
    },
    {
      title: "Return of the Jedi",
      director: "Richard Marquand",
      release_date: "1983-05-25",
    },
    {
      title: "Revenge of the Sith",
      director: "George Lucas",
      release_date: "2005-05-19",
    },
  ],
};

test("getLukeSkywalkerInfo", () => {
  return getLukeSkywalkerInfo().then((result) => {
    expect(result).toStrictEqual(expectedResult);
  });
});

test("getLukeSkywalkerInfoAsync", async () => {
  const result = await getLukeSkywalkerInfoAsync();
  expect(result).toStrictEqual(expectedResult);
});

test("getLukeSkywalkerInfoCallback", (done) => {
  getLukeSkywalkerInfoCallback((result: PersonInfo) => {
    expect(result).toStrictEqual(expectedResult);
    // the test should not complete before the callback was called
    done();
  });
});

test("getLukeSkywalkerInfoObservable", async () => {
  const result = await getLukeSkywalkerInfoObservable().toPromise();
  expect(result).toStrictEqual(expectedResult);
});
