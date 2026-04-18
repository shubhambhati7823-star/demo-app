<<<<<<< HEAD
import app from "./src/app.js";
import "dotenv/config"
import connectDB from "./src/common/config/db.js";

const PORT = process.env.PORT || 5000;
=======
import app from './src/app.js'
import { connectDB } from './src/common/config/db.js'
import { Server } from "socket.io";
import http from "http";
import chatSocket from "./src/module/chat/chat.socket.js";
>>>>>>> 882140d0ad9bb36850ebfcfdc68f68c0af61305c

const start = async () => {
    connectDB()
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
};

<<<<<<< HEAD
start().catch((err) => {
    console.log("Failed to start server", err);
    process.exit(1);
});
=======
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

chatSocket(io);

const start=async()=>{
    //connect to db
    await connectDB()
    server.listen(PORT,()=>{
        console.log(`Server is running at ${PORT}`);      
    })
}

start().catch((err)=>{
    console.error(err);
    process.exit(1)
})
>>>>>>> 882140d0ad9bb36850ebfcfdc68f68c0af61305c
