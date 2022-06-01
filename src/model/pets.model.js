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

const updatePet = async (req, res) => {
    let values = Object.values(req.body).map((value) =>value).concat([+req.params.id]);
    console.log(values);
    try {
        const isAvailable = await db.query(`SELECT * from pets WHERE id= ${+req.params.id}`)
        if(isAvailable.rows.length === 0) {
            throw new Error('pet not found')
        }
        if(Object.values(req.body).length !== 5)  {
            throw new Error('Missing fields')
        }
        return await db.query(`UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id= $6 returning *`,values)
    } catch(err) {
        return res.status(400).json({error:err.message})
    }

}

const deletePet = async (req, res) => {
    let values = [+req.params.id];
    try {
        const isAvailable = await db.query(`SELECT * from pets WHERE id= ${+req.params.id}`)
        if(isAvailable.rows.length === 0) {
            throw new Error('pet not found')
        }
        return db.query(`DELETE FROM pets WHERE id= $1 returning *`,values)
    } catch(err) {
        return res.status(400).json({error:err.message})
    }
   
}

const patchPet = async (req, res) => {
    console.log(req.body);
    let values = Object.values(req.body).map((value) =>value);
    let sqlString = `UPDATE pets SET`
    Object.keys(req.body).forEach((key, index)=> {
        if(index+ 1 === Object.keys(req.body).length) {
         sqlString += ` ${key} = $${index + 1}`
        } else {
            sqlString += ` ${key} = $${index + 1},`
        }
    })
    sqlString += ` WHERE id = ${+req.params.id} returning *`
    try {
        const isAvailable = await db.query(`SELECT * from pets WHERE id= ${+req.params.id}`)
        if(isAvailable.rows.length === 0) {
            throw new Error('pet not found')
        }
        await db.query(sqlString,values)
        const updated = await db.query(`SELECT * FROM pets WHERE id=${+req.params.id}`)
        return updated
    } catch(err) {
        return res.status(400).json({error:err.message})
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