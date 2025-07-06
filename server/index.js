import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import fs from "node:fs";
import path from "node:path";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

const dbPath = path.resolve("./server/db.json");
let db = JSON.parse(fs.readFileSync(dbPath));

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("getChatHistory", (channelId) => {
        const channel = db.channels[channelId];
        socket.emit("getChatHistory", {
            exists: !!channel,
            chatHistory: channel?.chatHistory || []
        })
    })

    socket.on("message", (data) => {
        io.emit("message", data);

        if(db.channels[data.channelId]) {
            db.channels[data.channelId].chatHistory.push(data);
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        } else {
            socket.emit("error", "Channel not found!");
        }
    })
})

server.listen(3000, () => {
    console.log("Server running on 3000");
})