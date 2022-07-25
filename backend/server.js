const cors = require('cors');
const { ObjectID } = require("mongodb");
const http = require('http');
const express = require('express');

const db = require('./db');
const app = express();
const path= require('path');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

const port = process.env.PORT||8080;
app.use(express.static(path.join(__dirname, 'cliente','build')));
app.use(cors());
app.use(express.json());

app.post('/scoreboard', async (req, res) => {


    const params = req.body;
    var result;

    try {
        const database = db.getDb("scoreboards");

        result = await database.collection('boards').insertOne(params);
    } catch(e) {
        res.send(e);
    }
    res.send(result);
});

app.put('/scoreboard/:scoreboardId', async (req, res) => {
    const id = req.params.scoreboardId;
    const params = req.body;
    var result;

    try {
        const database = db.getDb("scoreboards");

        const updateDoc = {
            $set: params
        };

        result = await database.collection('boards').updateOne({ _id: ObjectID(id) }, updateDoc);
        io.emit('updateBoard', params);
    } catch(e) {
        res.send(e);
    }
    res.send(result);
});

app.get('/share/:scoreboardId', async (req, res) => {
    const id = req.params.scoreboardId;
    var result;

    try {
        const database = db.getDb("scoreboards");

        result = await database.collection('boards').findOne({ _id: ObjectID(id) });

    } catch(e) {
        res.send(e);
    }
    res.send(result);
});

app.get('/health', (req, res) => {
    res.send('ok!');
});

server.listen(port, () => {
    db.connectToServer(err => {
        if (err) console.error(err);
    })
    console.log(`Server listening at http://localhost:${port}`);
});
