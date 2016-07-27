module.exports = function Route(app, server){
	var io = require('socket.io').listen(server)
  var history = [];
	io.sockets.on('connection', function (socket) {
    socket.on('clear_messages', function(){
      history = [];
      io.emit('clear_out');
    })
    socket.on("new_message", function (data){
      history.push(data.message);
      io.emit('receive_message', {response:data.message});
    })
    socket.on('new_user', function(data){
      socket.emit('history', {response:history});
      socket.broadcast.emit('user_login', {response:data.name} )
    })
	})
	// root route to render the index.ejs view
	app.get('/', function(req, res) {
	 res.render("index");
	})
};
