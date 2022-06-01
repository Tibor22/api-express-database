const breedsRespitory = require('../model/breeds.model.js') 

async function getBreeds(req, res) {

  
        const breeds =await breedsRespitory.getBreeds(req,res)
       
        res.json({'breeds' :[...breeds.rows]})
  



}

module.exports = {
    getBreeds,
}