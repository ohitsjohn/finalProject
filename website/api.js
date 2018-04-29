const express = require("express")
const api = express.Router()

let userId = 1

api.post('/user', (req, res) => {
    const user = req.body
    const newUser = {
        id: userId++,
        ...user
    }
    res.json(newUser)
})

module.exports = api