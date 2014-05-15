//routes/noteRoutes.js
var Note = require('../models/Note')

module.exports.collection = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  Note.find({}, function(err, note) {
    if(err){
      res.send(500, {error: err});
      return false;
    }
    res.send(note);
  });
};

exports.findById = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  Note.findOne({"_id": req.params.id}, function(err, note){
    if(err){
      res.send(500, {error: err});
      return false
    }
    res.send(note);
  });
};

exports.create = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var note = new Note(req.body);
  note.save(function(err, note){
    if(err){
      res.send(500, {error: err});
    }
    res.send(note);
  });
};

exports.update = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;
  delete req.body._id;
  Note.findOneAndUpdate({'_id': id}, req.body, function(err, note){
    if(err){
      res.send(500, {error: err});
    }
    res.send(note);
  });
};

exports.destroy = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  Note.remove({'_id': req.params.id}, function(err){
    if(err){
      res.send(500, {error: err});
      return false;
    }
    res.send({"message": "Sucess!"});
  })
};
