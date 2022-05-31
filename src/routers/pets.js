const express = require('express');
const id = require('faker/lib/locales/id_ID');
const routes = express.Router();
const db = require('../../db')
const petsControllers = require('../controllers/pets.controller.js')
const { body, validationResult }  = require('express-validator')


routes.get('/',async (req, res) => petsControllers.getAllPets(req, res))
routes.get('/:id',async(req, res) => petsControllers.getPet(req, res))
routes.post('/',body(['microchip','name','type','breed','age']).exists(),async(req, res) => {
    const errors = validationResult(req);
    console.log('ERROR:',errors);
    if (!errors.isEmpty()) {
        return res.status(400).json( errors.array()[0].param + ' input field is missing');
      }
   return petsControllers.postPet(req, res)
} )


module.exports =routes;