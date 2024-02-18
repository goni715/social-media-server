const app = require('./app');
const http = require('http');
const socketIo = require('socket.io')
const server = http.createServer(app);
const PORT=5000;

const io = socketIo(server,{
    cors: {
        origin: '*',
        credentials: true
    }
})


io.on("connection", (socket)=>{
    console.log('a user connected');


    //send-data
    io.emit("receive-message-from-server", "Hello this is goni");


    //receive-message
    socket.on("send-message-from-client", (data)=>{
        console.log(data);
    })


    //confirm-request
    socket.on("confirm-request", (data)=>{
        if(data){
            console.log(data);
            io.emit("success-request", "YES")
        }

    })


    socket.on('disconnect', () => {
        console.log('user disconnect')
    })

})


server.listen(PORT,function () {
    console.log("Server run @5000")
})
