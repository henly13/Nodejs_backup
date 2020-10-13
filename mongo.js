const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = 'mongodb://127.0.0.1:27017'


const dbName = 'data1'


MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log("connectt successfully");


    const db = client.db(dbName);

    //寫入資料庫

    db.collection("posts", function(err, collection) {
        var list = [
            { title: "AAAAAAAAAA", tag: "hehe" }, { title: "測試資料庫連結", tag: "testing" }
        ];
        collection.insertMany(list, function(err, result) {
            assert.equal(null, err)
            client.close();
        });
    });


    //讀取資料庫

    db.collection("posts", function(err, collection) {
        collection.find({ "score": 100 }).toArray(function(err, docs) {
            assert.equal(null, err)
            console.log(docs);
            client.close();


        })



    })






});