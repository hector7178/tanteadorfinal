const { MongoClient } = require("mongodb");
const uri =
    "mongodb+srv://hector7178:taulica123@cluster0.izqeutb.mongodb.net/test";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db("scoreboards");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};