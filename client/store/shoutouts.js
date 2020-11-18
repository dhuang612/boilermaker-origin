import axios from 'axios'
import history from '../history'

const CREATE_SHOUTOUT = 'CREATE_SHOUTOUT'

const GET_SHOUTOUTS = 'GET_SHOUTOUTS'

const GET_SINGLE_SHOUTOUT = 'GET_SINGLE_SHOUTOUT'

const shoutout = {}

const newShoutout = shoutout => ({type: CREATE_SHOUTOUT, shoutout})

const getShoutouts = shoutouts => ({type: GET_SHOUTOUTS, shoutouts})

const getSingleShoutout = shoutout => ({
  type: GET_SINGLE_SHOUTOUT,
  shoutout
})

export const addShoutout = (name, message, email, from) => async dispatch => {
  try {
    const add = await axios.post('/api/shoutouts/new', {
      name,
      message,
      email,
      from
    })
    console.log(add)
  } catch (error) {
    console.error(error)
  }
}

export const showShoutouts = id => async dispatch => {
  try {
    const shoutoutsToFind = await axios.get(
      `/api/shoutouts/showAllShoutouts`,
      id
    )
    console.log('these are your shoutouts', shoutoutsToFind)
    if (shoutoutsToFind) {
      dispatch(getShoutouts(shoutoutsToFind))
    }
  } catch (error) {
    console.log(error)
  }
}

export const showSingleShoutout = id => async dispatch => {
  try {
    const shoutoutToFind = await axios.get(`/api/shoutouts/${id}`)
    dispatch(getSingleShoutout(shoutoutToFind))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = shoutout, action) {
  switch (action.type) {
    case CREATE_SHOUTOUT:
      return action.shoutout
    case GET_SHOUTOUTS:
      return action.shoutouts
    case GET_SINGLE_SHOUTOUT:
      return action.shoutout
    default:
      return state
  }
}
