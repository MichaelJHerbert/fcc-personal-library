/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function(done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "comment_count",
          "Books in array should contain comment_count"
        );
        assert.property(
          res.body[0],
          "book_title",
          "Books in array should contain book_title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function() {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function() {
        test("Test POST /api/books with title", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "test1"
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, "response should be an object");
              assert.property(
                res.body,
                "comment_count",
                "Object should contain comment_count"
              );
              assert.property(
                res.body,
                "book_title",
                "Object should contain book_title"
              );
              assert.property(res.body, "_id", "Object should contain _id");
              assert.property(
                res.body,
                "book_comments",
                "Object should contain array of book comments"
              );
              done();
            });
        });

        test("Test POST /api/books with no title given", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: ""
            })
            .end(function(err, res) {
              assert.equal(res.status, 400);
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function() {
      test("Test GET /api/books", function(done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "response should be an array");
            assert.property(
              res.body[0],
              "comment_count",
              "Books in array should contain comment_count"
            );
            assert.property(
              res.body[0],
              "book_title",
              "Books in array should contain book_title"
            );
            assert.property(
              res.body[0],
              "_id",
              "Books in array should contain _id"
            );
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function() {
      test("Test GET /api/books/[id] with id not in db", function(done) {
        chai
          .request(server)
          .get("/api/books/test")
          .end(function(err, res) {
            assert.equal(res.status, 400);
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function(done) {
        chai
          .request(server)
          .get("/api/books/5ded8e8fc257aa275a77dd78")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, "response should be an object");
            assert.property(
              res.body,
              "book_title",
              "Object should contain book_title"
            );
            assert.property(res.body, "_id", "Object should contain _id");
            assert.property(
              res.body,
              "book_comments",
              "Object should contain array of book comments"
            );
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function() {
        test("Test POST /api/books/[id] with comment", function(done) {
          chai
            .request(server)
            .post("/api/books/5ded8e8fc257aa275a77dd78")
            .send({
              comment: "this is a test"
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, "response should be an object");
              assert.property(
                res.body,
                "book_title",
                "Object should contain book_title"
              );
              assert.property(res.body, "_id", "Object should contain _id");
              assert.property(
                res.body,
                "book_comments",
                "Object should contain array of book comments"
              );
              done();
            });
        });
      }
    );
  });
});
