/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
const Book = require('../models/Book');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, function(err, books){
        if(err){
          res.status(404).send('No Books Found')
        } else {
          let bookList = [];
          
          books.forEach(book => {
            let {
              _id,
              book_title,
              comment_count
            } = book;
            
            bookList.push({
              _id,
              book_title,
              comment_count
            });
          });
          res.json(bookList);
        }
      });
    })
    
    .post(function (req, res){
      var title = req.body.title;
      if(!title){
        return res.status(400).send('Please enter valid title');
      }
      //response will contain new book object including atleast _id and title
      const book = new Book({
        book_title: title
      });
      book.save(function(err, data){
        let {
          _id, 
          book_title, 
          comment_count, 
          book_comments
        } = data
        
        if(err){
          res.status(500).send('Failed to create book entry');
        } else {
          res.json({
            _id,
            book_title,
            comment_count,
            book_comments
          });
        }
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}, function(err){
        if(err){
          return res.status(500).send('Failed to delete all books');
        } else {
          return res.send('Deleted all books in database');
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
    
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookid, function(err, book){
        if(err || !bookid){
          res.status(400).send('No book in database with _id: ' + bookid)
        } else {
          let {
              _id,
              book_title,
              book_comments
            } = book;
          
          res.json({
            _id,
            book_title,
            book_comments
          });
        }
      });    
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
      Book.findByIdAndUpdate(bookid, 
        {
          $push: { "book_comments": comment },
          $inc: { "comment_count": 1 }
        },
        { new: true },
        function(err, book){
          if(err || !bookid){
            res.status(404).send('No book in database with _id: ' + bookid)
          } else {
            let {
                _id,
                book_title,
                book_comments
              } = book;

            res.json({
              _id,
              book_title,
              book_comments
            });
          }
        }
      );        
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(bookid, function(err){
        if(err){
          res.status(500).send('Failed to delete book');
        } else {
          res.send('Successfully Deleted Book');
        }
      })
    });
  
};
