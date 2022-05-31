const db = require('../../db')
const express = require("express");
const app = express();
app.use(express.json());

const getBooks = async(req,res) => {
    let books;


try {
    if(req.query.type && req.query.topic) {
       return books = await db.query(`SELECT * FROM books WHERE lower(type) like '${req.query.type}' AND lower(topic) like '${req.query.topic}'`);
      } else if(req.query.type) {
     return  books = await db.query(`SELECT * FROM books WHERE lower(type) like '${req.query.type}'`);
      } else if(req.query.topic) {
      return books = await db.query(`SELECT * FROM books WHERE lower(topic) like '${req.query.topic}'`);
      }  else {
      return books = await db.query('SELECT * FROM books');
      }

}catch(err) {
    return res.status(400).send({ error: 'Invalid request'})
}
 
}

const getBook = async (req, res) => {
    const id = +req.params.id;
    try {
        return book = await db.query(`SELECT * FROM books WHERE id=${id}`)
    } catch(err) {
        return res.status(400).send({ error:'invalid request'})
    }
   
}


const postBook = async (req, res) => {
    if(Object.values(req.body).length === 6) {
        return await db.query(`INSERT INTO books (title, type, author, topic, publicationDate, pages) VALUES (${Object.values(req.body).map((value) => `'${value}'`).join(",")}) returning *`)
         
       }
       return res.status(400).send({ error:'Missing field(s)'})
}

module.exports = {
    getBooks,
    getBook,
    postBook,
}