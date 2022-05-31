const petsRespitory = require('../model/pets.model.js') 

async function getAllPets(req, res) {
   
    const animal = await petsRespitory.getAllPets(req,res)
    res.json({pets: animal.rows})
}

async function getPet(req,res) {
      const pet =await petsRespitory.getPet(req,res)
      if(pet.rowCount === 0) {
         return res.status(400).send({message:'ID doesnt exist'})
      }
      console.log(pet.rowCount);
  return  res.json({pet: pet.rows[0]})
}

async function postPet(req, res) {
    const pet = await petsRespitory.postPet(req,res)
    res.json({pet:{...pet.rows[0]}})
}

module.exports = {
    getAllPets,
    getPet,
    postPet,
}