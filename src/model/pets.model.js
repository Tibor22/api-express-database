const db = require('../../db')
const express = require("express");
const app = express();
app.use(express.json());


const getAllPets = async (req, res) => {
//   = `SELECT * FROM pets LIMIT ${+perPage} OFFSET ${page * perPage} WHERE`
    console.log(req.query.page);
    let page = req.query.page ? Number(req.query.page) : 0;
   let perPage =req.query["per_page"] ? +req.query["per_page"] : 20;
   let sqlString;
    try {
     if(req.query.type && req.query.microchip) {
         sqlString = `SELECT * FROM pets WHERE type='${req.query.type}' AND microchip='${req.query.microchip}' LIMIT ${+perPage} OFFSET ${page * perPage}`
        }
       else if(req.query.type) {
         sqlString = `SELECT * FROM pets WHERE type='${req.query.type}' LIMIT ${+perPage} OFFSET ${page * perPage}`
        } else if (req.query.microchip) {
         sqlString = `SELECT * FROM pets WHERE microchip='${req.query.microchip}' LIMIT ${+perPage} OFFSET ${page * perPage}`
        } else {
         sqlString = `SELECT * FROM pets  LIMIT ${+perPage} OFFSET ${page * perPage}`
        }
        return await db.query(sqlString);

    }catch(err) {
        return res.status(400).json({error: "Invalid request"})
    }
 
  
}

const getPet = async (req, res) => {

    
   
    return pet = await db.query(`SELECT * FROM pets WHERE id=${+req.params.id}`);
}

const postPet = async (req, res) => {

 

    
    const values  = Object.values(req.body).map((value) =>{
        if(typeof value === 'string') {
           return `'${value}'`
        } else return value
    }).join(",") 
    try {
       return pet = await db.query(`INSERT INTO pets (name, age, type, breed, microchip) VALUES(${values}) returning *`)
    } catch(e) {
       return res.status(400).json({"error": "failed to create pet"})
    }
   

}

module.exports = {
    getAllPets,
    getPet,
    postPet,
}