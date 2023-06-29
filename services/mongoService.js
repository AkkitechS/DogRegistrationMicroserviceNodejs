var mongo = require("mongodb");

class MongoService {

    insertDocument(query, callback) {
        mongo.MongoClient.connect("mongodb://localhost:27017", (err, conn) => {
            if(!err) {
                conn.db("dogregistrationdb").collection("dogs").insert(query, err => {
                    if(!err) {
                        callback({status : 1});
                    } else {
                        callback({status : 0});
                    }
                });
                conn.close();
            } else {
                callback({status : 0});
            }
        });
    }
    
    findDocument(query, callback) {
        mongo.MongoClient.connect("mongodb://localhost:27017", (err, conn) => {
            if(!err) {
                conn.db("dogregistrationdb").collection("dogs").findOne(query, (err, data) => {
                    if(!err) {
                        callback(data);
                    } else {
                        callback({status : 0});
                    }
                });
                conn.close();
            } else {
                callback({status : 0});
            }
        });

        return callback;
    }

    findAllDocuments(callback) {
        mongo.MongoClient.connect("mongodb://localhost:27017", (err, conn) => {
            if(!err) {
                conn.db('dogregistrationdb').collection("dogs").find({}, (err, data) => {
                    if(!err) {
                        data.toArray((err, documents) => {
                            if(!err) {
                                callback(documents);
                            } else {
                                callback({status : 0});
                            }
                        }); 
                    } else {
                        callback({status : 0});
                    }
                });
                conn.close();
            } else {
                callback({status : 0});
            }
        });
    }

    updateDocument(query, update, callback) {
        mongo.MongoClient.connect("mongodb://localhost:27017", (err, conn) => {
            if(!err) {
                conn.db('dogregistrationdb').collection("dogs").updateOne(query, update, (err) => {
                    if(!err) {
                        callback({status : 1});
                    } else {
                        callback({status : 0});
                    }
                });
                conn.close();
            } else {
                callback({status : 0});
            }
        });
    }
}

module.exports = MongoService;