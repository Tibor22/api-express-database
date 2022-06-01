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
   return res.json({pet:{...pet.rows[0]}})
}

async function updatePet(req, res) {
    try {
        const updatedPet = await petsRespitory.updatePet(req,res)
        return res.json({pet:{...updatedPet.rows[0]}})
    }catch(err) {
        console.log(err);
    }

}

async function deletePet(req, res) {
    try {
        const deletedPet = await petsRespitory.deletePet(req,res)
        return res.json({pet:{...deletedPet.rows[0]}})
    } catch(err) {
        console.log(err);
    }

}
async function patchPet(req, res) {
    try {
        const updatedPet = await petsRespitory.patchPet(req, res)
        return res.json({pet:{...updatedPet.rows[0]}})
    } catch(err) {
        console.log(err);
    }

}

module.exports = {
    getAllPets,
    getPet,
    postPet,
    updatePet,
    deletePet,
    patchPet,
}