const express = require('express')
const router = express.Router()
const {
    getMatieres,
    setMatiere,
    updateMatiere,
    deleteMatiere
  }= require('../controllers/matiereController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getMatieres).post(protect, setMatiere)
router.route('/:id').delete(protect, deleteMatiere).put(protect, updateMatiere)

module.exports = router
