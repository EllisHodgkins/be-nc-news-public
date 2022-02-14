const {
    getTopics,
  } = require("../db/helpers/utils");

const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")

beforeEach(() => {
    seed(testData)
})

afterAll(() => {
  db.end();
});
  
  describe("getTopics", () => {
    test("Responds with an array of topic objects, slug & description", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          console.log(response.body);
          expect(response.body).toEqual(
            [
                {
                  description: 'The man, the Mitch, the legend',
                  slug: 'mitch'
                },
                {
                  description: 'Not dogs',
                  slug: 'cats'
                },
                {
                  description: 'what books are made of',
                  slug: 'paper'
                }
              ]
          );
        });
    });
});