const mongoose = require('mongoose')

const matiereSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a Description'],
      },
      duration: {
        type: String,
        required: [true, 'Please add a duration'],
      },
      color: {
        type: String,
        required: [true, 'Please add a color'],
      },
      code: {
        type: String,
        required: [true, 'Please add a code'],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      day:{
        type:String,
        required:true
      },
      time:{
        type:String,
        required:true
      }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Matiere', matiereSchema)
