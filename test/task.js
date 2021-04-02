let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {
  let token = "";
  /**
   * Test the POST route for user login
   */
  describe("POST /user/login", () => {
    it("It should POST a request for user login", (done) => {
      const task = {
        email: "test12@test.com",
        password: "test1012",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          token = response.body.token;
          response.body.should.have
            .property("message")
            .eq("User authenticated");
          done();
        });
    });

    it("It should NOT POST a request for login without the email", (done) => {
      const task = {
        password: "test1012",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(task)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq("User not exist");
          done();
        });
    });
  });

  /**
   * Test the POST route for support
   */

  describe("POST /user/support", () => {
    it("It should POST a request for Support", (done) => {
      const task = {
        message: "Test Support",
      };
      chai
        .request(server)
        .post("/user/support")
        .set({ Authorization: `Bearer ${token}` })
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eq("Ticket Submitted");
          done();
        });
    });
  });

  /**
   * Test the PATCH route for details
   */

  describe("PATCH /user/details", () => {
    it("It should PATCH an First Name and Last Name for User API", (done) => {
      const task = {
        firstName: "john",
        lastName: "doe",
        email: "test12@test.com",
        password: "test1012",
      };
      chai
        .request(server)
        .patch("/user/details")
        .set({ Authorization: `Bearer ${token}` })
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("message").eq("Updated");
          response.body.should.have.property("firstName").eq(task.firstName);
          response.body.should.have.property("lastName").eq(task.lastName);
          done();
        });
    });

    it("It should NOT PATCH an First Name and Last Name for User API", (done) => {
      const task = {
        firstname: "john",
        lastname: "doe",
        email: "test12@test.com",
        password: "test",
      };
      chai
        .request(server)
        .patch("/user/details")
        .set({ Authorization: `Bearer ${token}` })
        .send(task)
        .end((err, response) => {
          response.should.have.status(401);
          response.text.should.be.eq("User Unauthorized Access");
          done();
        });
    });
  });

  /**
   * Test the PATCH route for Admin Login
   */
  describe("POST /admin/login", () => {
    it("It should POST a request for Admin login", (done) => {
      const task = {
        email: "test12@test.com",
        password: "test1012",
      };
      chai
        .request(server)
        .post("/admin/login")
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          token = response.body.token;
          response.body.should.have
            .property("message")
            .eq("User authenticated");
          done();
        });
    });

    it("It should not POST a request for Admin login", (done) => {
      const task = {
        email: "test2@test.com",
        password: "test1012",
      };
      chai
        .request(server)
        .post("/admin/login")
        .send(task)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
          token = response.body.token;
          response.body.should.have
            .property("message")
            .eq("User Unauthorized Access");
          done();
        });
    });

    /**
     * Test the GET route
     */
    describe("GET /admin/tickets", () => {
      it("It should POST a request for Admin login", (done) => {
        const task = {
          email: "test12@test.com",
          password: "test1012",
        };
        chai
          .request(server)
          .post("/admin/login")
          .send(task)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            token = response.body.token;
            response.body.should.have
              .property("message")
              .eq("User authenticated");
            done();
          });
      });

      it("It should GET all the Tickets", (done) => {
        chai
          .request(server)
          .get("/admin/tickets")
          .set({ Authorization: `Bearer ${token}` })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("result");
            done();
          });
      });
    });
  });
});
