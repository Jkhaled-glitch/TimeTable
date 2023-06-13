const asyncHandler = require('express-async-handler')
const Matiere = require('../models/matiereModel')
const User = require('../models/userModel')

// @desc    Get matieres
// @route   GET /api/matieres
// @access  Private
const getMatieres = asyncHandler(async (req, res) => {
  const matieres = await Matiere.find({ user: req.user.id })

  res.status(200).json(matieres)
})

// @desc    Set Matiere
// @route   POST /api/matieres
// @access  Private
const setMatiere = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const matiere = await Matiere.create({
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    color: req.body.color,
    code: req.body.code,
    user: req.user.id,
    day: req.body.day ,
    time: req.body.time
  })

  res.status(200).json(matiere)
})

// @desc    Update matieres
// @route   PUT /api/matieres/:id
// @access  Private
const updateMatiere = asyncHandler(async (req, res) => {
  const matiere = await Matiere.findById(req.params.id)

  if (!matiere) {
    res.status(400)
    throw new Error('Matiere not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the matiere user
  if (matiere.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedMatiere = await Matiere.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedMatiere)
})

// @desc    Delete matieres
// @route   DELETE /api/matieres/:id
// @access  Private
const deleteMatiere = asyncHandler(async (req, res) => {
  const matiere = await Matiere.findById(req.params.id)

  if (!matiere) {
    res.status(400)
    throw new Error('Matiere not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the matiere user
  if (matiere.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await matiere.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getMatieres,
  setMatiere,
  updateMatiere,
  deleteMatiere,
}
