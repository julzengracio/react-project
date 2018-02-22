const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const article = require('../models/article');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// MongoDb url
const dburl = "mongodb://@localhost:27017/articles";

let dbase;

// Connect to server
mongoose.Promise = global.Promise;
mongoose.connect(dburl, function(err, database) {
    if(err){
        console.log('Error connecting')
        console.log(err);
        return;
    }
    dbase = database;
    console.log("Connected successfully to server");
});

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
const gfs = Grid(conn.db);
// console.log(gfs);

// storage set up using multer-gridfs-storage
const storage = new GridFsStorage({
    url : dburl,
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg') {
          return {
            filename: file.originalname,
            bucketName: 'images'
          };
        } else {
          return null;
        }
      }
});

// multer settings for single upload
let upload = multer({
    storage: storage
}).single('file');

// Get all the articles
router.get('/articles', function(req, res) {
    article.find({})
        .exec(function(err, articles) {
            if (err) {
                console.log('Error getting the articles');
                console.log(err);
            } else {
                //console.log(articles);
                res.json(articles);
            }
        });
});

// Get a single article
router.get('/articles/:id', function(req, res) {
    console.time('View load time');
    console.log('Requesting a specific article');
    article.findById(req.params.id)
        .exec(function(err, article){
            if(err){
                console.log('Error getting the article')
                console.log(err);
            } else {
                res.json(article);
            }
        });
    console.timeEnd('View load time');
});

router.get('/file', function(req, res){
    gfs.collection('images'); //set collection name to lookup into
  
    gfs.files.find().toArray(function(err, files){
      if(!files || files.length === 0){
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error"
        });
      }
      res.send(JSON.stringify(files));
    });
  });

router.get('/file/:filename', function(req, res){
    gfs.collection('images'); //collection name for finding the files

    // check if file exist
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // Create read stream
        let readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "images"
        });
        // set content type
        res.set('Content-Type', files[0].contentType)
        return readstream.pipe(res);
    });
});

// Create
router.post('/create', function(req, res) {
    console.time('Create load time');
    console.log('Posting an Article');
    let newArticle = new article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.filename = req.body.filename;
    newArticle.save(function(err, article) {
        if(err) {
            console.log('Error inserting the article');
            console.log(err);
        } else {
            res.json(article);
        }
    });
    console.timeEnd('Create load time');
});

// upload image
router.post('/upload', function(req, res) {
    upload(req, res, function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0, err_desc:null});
    });
});

// Update
router.post('/update/:id', function(req, res) {
    console.log('Updating an Article');

    article.findById(req.params.id)
        .exec(function(err, article) {
            if (err) {
                console.log('Could not find the article');
            } else {
                article.title = req.body.title;
                article.content = req.body.content;
                article.save();
                res.json(article);
            }
        });
});

// Delete
router.get('/delete/:id', function(req, res) {
    console.log('Deleting an article');
    article.findByIdAndRemove(req.params.id)
        .exec(function(err, article){
            if(err){
                console.log('Error deleting the article')
                console.log(err);
            } else {
                res.json(article);
            }
        });
});

// Create multiple articles
router.post('/test', function(req, res) {
    console.time('Stress Test')
    for (let i = 0 ; i < req.body.number; i++) {
        let newArticle = new article();
        newArticle.title = req.body.title;
        newArticle.content = req.body.content;
        newArticle.save(function(err, article) {
            if(err) {
                console.log('Error inserting the article');
                console.log(err);
            } else {
                // console.log('success');
            }
        });
    }
    console.timeEnd('Stress Test')
    res.sendStatus(201);
});

module.exports = router;