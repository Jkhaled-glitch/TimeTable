
const express = require('express')
const router = express.Router()


const   verifRobot = require('../controllers/robotController')

router.post('/robot',verifRobot)



module.exports = router
