const booksRespitory = require('../model/books.model.js') 

async function getBooks(req,res) {
  const books =await booksRespitory.getBooks(req,res)
  return  res.json({ books: books.rows})
}

async function getBook(req,res) {
 const book = await booksRespitory.getBook(req,res)
  return  res.json({ book: book.rows[0]})
}

async function postBook(req,res) {
    const book = await booksRespitory.postBook(req,res)
    return res.json({...book.rows[0]})
}

module.exports = {
    getBooks,
    getBook,
    postBook,
}