const express = require('express')
const booksControllers = require('../controllers/books.controller.js')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => booksControllers.getBooks(req, res))
router.get('/:id', async (req, res) => booksControllers.getBook(req, res))
router.post('/', async (req, res) =>   booksControllers.postBook(req, res))
   

module.exports = router
