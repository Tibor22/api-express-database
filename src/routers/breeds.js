const express = require('express');
const id = require('faker/lib/locales/id_ID');
const routes = express.Router();
const db = require('../../db')
const breedsControllers = require('../controllers/breeds.controller.js')
const { body, validationResult }  = require('express-validator')


routes.get('/',async (req, res) => breedsControllers.getBreeds(req, res))

module.exports = routes