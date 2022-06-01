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
    return res.status(300).json({...book.rows[0]})
}

async function updateBook(req,res) {
   const updatedBook = await booksRespitory.updateBook(req,res)
   return res.json({ book: updatedBook.rows[0]})
}

async function deleteBook(req,res) {
  const deletedBook = await booksRespitory.deleteBook(req,res)
  return res.status(200).json({book:deletedBook.rows[0]})
}

module.exports = {
    getBooks,
    getBook,
    postBook,
    updateBook,
    deleteBook,
}