import axios from 'axios'

const API_URL = '/api/matieres/'


// Create new matiere
const createMatiere = async (matiereData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, matiereData, config)

  return response.data
}

// Get user matieres
const getMatieres = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}


// Delete user matiere
const deleteMatiere = async (matiereId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + matiereId, config)

  return response.data
}

// update  user Matiere
const updateMatiere = async (matiereId,newValue, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  const response = await axios.put(API_URL + matiereId, newValue ,config)

  return response.data
}

const matiereService = {
    createMatiere,
    getMatieres,
    deleteMatiere,
    updateMatiere
}

export default matiereService
