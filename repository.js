const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// const url = 'mongodb://mongo:27017/dockerize-me';
const url = 'mongodb://mongo:27017';
let db = null;
// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log("Connected successfully to db server");

    // connect to jbankingdb database
    db = client.db('jbankingdb');
});

// create user account using the collection.insertOne function
const create = (name, email, password) => {
    return new Promise((resolve,reject)=> {
        const collection = db.collection('users');
        const doc = {name,email,password,balance:0};
        collection.insertOne(doc,{w:1},function(err, result){
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account 
const find = (email) => {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
const findOne = (email) => {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
const update = (email, amount) => {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
const all = () => {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err,docs){
                err ? reject(err): resolve(docs);
            });
        })
}


module.exports = { create, findOne, find, update, all };