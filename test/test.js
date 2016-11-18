var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var request =require('request');
var server = require('../app');

var should = chai.should();
chai.use(chaiHttp);

  /*
  * Test the /POST register route
  */
  describe('/POST register', () => {
      it('it should not register without password field', function(done) {
        var user = {
            username: "test",
            email: "test"
        }
        chai.request(server)
            .post('http://localhost:3000/register')
            .send(user)
            .end((err, res) => {
                 expect(user).to.have.property('password');
            });
      });

  });

  /*
  * Test the /POST register route
  */
  describe('/POST register', () => {
      it('it should register', function(done) {
        var user = {
            username: "test",
            email: "test",
            password:"test"
        }
        chai.request(server)
            .post('http://localhost:3000/register')
            .send(user)
            .end((err, res) => {
            	//res.status.should.equal('200');
            	res.should.have.status(200);
            });
      });

  });