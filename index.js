var io=require('socket.io')(process.env.PORT || 3000);
var player=require("./classes/player.js");

console.log('connecting to node server');

var players=[];
var sockets=[];

io.on('connection',function(socket){

    console.log('c stablished');


    let playerins=new player();
    let thisplayerId=playerins.id;

    players[thisplayerId]=playerins;
    socket[thisplayerId]=socket;


    socket.emit('register', {id: thisplayerId} );
    socket.emit('spawn', playerins); //tell myself i have spawned
    socket.broadcast.emit('spawn',playerins); //tell others i have spawned

    //get all the spawned
    // looping over dic brings back key
    for(var playerid in players)
    {
        if(playerid != thisplayerId)
        {
            socket.emit('spawn',players[playerid]);
        }
    }


    socket.on('updateposition',function(data){

        playerins.position.x=data.position.x;
        playerins.position.y=data.position.y;
        playerins.position.z=data.position.z;

       
        socket.broadcast.emit('updatePosition',playerins);
    })




    socket.on('disconnect',function(){
        console.log('A player has disconnected');
        delete players[thisplayerId];
        delete sockets[thisplayerId];

        socket.broadcast.emit("disconnected",playerins);
    })


})