const PORT= 8000;
const app = require("express")();
const httpServer = require("http").createServer(app);
const { disconnect } = require("process");
const { Server } = require("socket.io");

const users = {};

const io = new Server(httpServer, {
    cors: {
    origin: "https://globbable.vercel.app/",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

app.get("/",(req,res) =>{
    console.log("homepage = hello world")
    res.status(200).json({"name":"amrit"})
})

io.on("connection", (socket) => {
 console.log("connection established and socket id = " + socket.id)
  socket.on("disconnect",() => {
    for(let user in users){
      if(users[user] === socket.id){
        delete users[user]

      }
    }
    io.emit("all_users",users)

    console.log(`${socket.id} is disconnected`)
 })

 socket.on("new_user",(u) => {
  console.log(`${u} is online.`);
  users[u] = socket.id;
  io.emit("all_users",users)
 })

 socket.on("send_message",data => {
  console.log(data)

  const socketId = users[data.receiver];
  console.log(socketId)
  io.to(socketId).emit("new_message",data)
 })

 socket.on("disconnect", reason => {
    // io.emit("all_users",users)
    io.emit("all_users",users)
 })
});


httpServer.listen(PORT,() => {
    console.log(`server on port = ${PORT}`)
});