var superagent = require('superagent'),

    chai = require('chai'),
    expect = chai.expect,
    should = chai.should,

    app = require('../../server.js').app;

describe('Note JSON api', function(done){
  var id;

  //testing the POST function of the JSON API
  it('can sucessfully create a new note', function(done){
    superagent.post('http://localhost:3000/api/v1/notes')
      .send({
        body: 'a new note!'
      })
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body._id).to.not.be.eql(null);
        expect(res.body.body).to.eql('a new note!');
        id =res.body._id;

        done();
      })

  });
  //testing the Get function of the JSON API
  it('can sucessfully get a note', function(done){
    superagent.get('http://localhost:3000/api/v1/note/' + id)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(id);
        expect(res.body.body).to.eql('a new note!');

        done();
      })
  });

  //testing the PUT function
  it('can sucessfully update a note', function(done){
    superagent.put('http://localhost:3000/api/v1/note/' + id)
      .send({
        body: 'an updated note'
      })
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(id);
        expect(res.body.body).to.eql('an updated note');

        done();
      });
  });
  //testing the destroy function
  it('it sucessfully destroys a note', function(done){
    superagent.del('http://localhost:3000/api/v1/note/' + id)
      .end(function(err, res){
        expect(err).to.eql(null);

        done();
      });
  });

});
