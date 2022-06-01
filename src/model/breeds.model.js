const db = require('../../db')
const express = require("express");
const app = express();
app.use(express.json());


async function getBreeds(req, res) {
    const {type} = req.query;
    let values = [type]
    return await db.query(`SELECT DISTINCT breed FROM pets WHERE type= $1`,values)
}

module.exports = {
    getBreeds,
}