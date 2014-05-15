'use strict';

var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    bodyparser = require('body-parser'),
    noteRoutes = require('./routes/noteRoutes'),
    app = express();

app.use(bodyparser());

mongoose.connect('mongodb://localhost/notes-development');

app.get('/api/v1/notes', noteRoutes.collection);
app.get('/api/v1/note/:id', noteRoutes.findById);
app.post('/api/v1/notes', noteRoutes.create);
app.put('/api/v1/note/:id', noteRoutes.update);
app.delete('/api/v1/note/:id', noteRoutes.destroy);

app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('server is listening on port ' + app.get('port'));
});
