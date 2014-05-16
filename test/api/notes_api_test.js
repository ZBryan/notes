var superagent = require('superagent'),

    chai = require('chai'),
    expect = chai.expect,
    should = chai.should,

    app = require('../../server.js').app;
var port = process.env.PORT || 3000;
var resourceUrl = 'htpp://localhost:' + port + 'api/v1/notes';

describe('Note JSON api', function(done){
  var id;

  //testing the POST function of the JSON API
  it('can sucessfully create a new note', function(done){
    superagent.post('resourceUrl')
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
    superagent.get('resourceUrl/' + '/' + id)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(id);
        expect(res.body.body).to.eql('a new note!');

        done();
      })
  });

  //testing the PUT function
  it('can sucessfully update a note', function(done){
    superagent.put('resourceUrl/' + '/' + id)
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
    superagent.del('resourceUrl/' + '/' + id)
      .end(function(err, res){
        expect(err).to.eql(null);

        done();
      });
  });

});
