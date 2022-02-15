const {
    getTopics,
  } = require("../db/helpers/utils");

const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
  return db.end();
});
  
  describe("getTopics", () => {
    test("Responds with an array of topic objects, slug & description", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body.topics).toEqual(
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
    test('should respond with 404 path not found', () => {
        return request(app)
        .get("/api/topicz")
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe("404 - path not found");
        })
    });
});

describe("getArticles", () => {
    test("Responds with the required first article", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
          expect(response.body.article).toEqual(
              [{
                article_id: 1,
                created_at: "2020-07-09T20:11:00.000Z",
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                votes: 100,
              }]
          );
        });
    });
    test('should respond with 404 path not found', () => {
        return request(app)
        .get("/api/articles/112222222222222222")
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe("404 - article not found");
        })
    });
    test('should respond with 400 ID not a number', () => {
        return request(app)
        .get("/api/articles/1n2n3n4n")
        .expect(400)
        .then(({body: {msg}}) => {
            expect(msg).toBe("400 - article ID must be a number!");
        })
    });
});