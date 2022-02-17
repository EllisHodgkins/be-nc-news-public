const { getTopics } = require("../db/helpers/utils");

const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const { topicData } = require("../db/data/test-data/index");
const { articleData } = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("getTopics", () => {
  test("Responds with an array of topic objects, slug & description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(topicData.length);
        response.body.topics.forEach((response) => {
          expect(response).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
  test("should respond with 404 path not found", () => {
    return request(app)
      .get("/api/topicz")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("404 - path not found");
      });
  });
});

describe("getArticles", () => {
  test("Responds with all articles in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(articleData.length);
        expect(response.body).toBeSortedBy("created_at", { descending: true });
        response.body.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });

  test("should respond with 404 path not found", () => {
    return request(app)
      .get("/api/articlez")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("404 - path not found");
      });
  });
});

describe("getArticlesByID", () => {
  test("Responds with the required first article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((articles) => {
        console.log(articles.body)
        expect(articles.body).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 1,
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("should respond with 404 article not found", () => {
    return request(app)
      .get("/api/articles/112222222222222222")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("404 - article not found");
      });
  });
  test("should respond with 400 ID not a number", () => {
    return request(app)
      .get("/api/articles/1n2n3n4n")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("400 - Does not match article ID type!");
      });
  });
});

describe("getUsers", () => {
  test("should return an array of usernames", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
            })
          );
        });
      });
  });

  test("should respond with 404 path not found", () => {
    return request(app)
      .get("/api/userz")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("404 - path not found");
      });
  });
});

describe("getArticleComments", () => {
  test("Responds with articles comments when given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        response.body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              article_id: 1,
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
  test("Responds with articles comments when given article_id", () => {
    return request(app)
      .get("/api/articles/6/comments")
      .expect(200)
      .then((response) => {
        response.body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              article_id: 6,
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
  test("should respond with 400 ID not a number", () => {
    return request(app)
      .get("/api/articles/blarg69/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("400 - article ID must be a number!");
      });
  });
});

describe('Delete given comment based on ID responding with 204 status and no content.', () => {
    test('should delete the given comment and have status 204', () => {
      return request(app)
      .delete("/api/comments/1")
      .expect(204)
  });
});
