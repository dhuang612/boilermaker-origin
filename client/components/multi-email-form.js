import React from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'

export const MultiEmailForm = props => {
  const {newEmails, handleSubmit, handleChange, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstNameOne">
            <small>first name</small>
          </label>
          <input name="firstNameOne" type="text" />
        </div>
        <div>
          <label htmlFor="emailOne">
            <small>Email</small>
          </label>
          <input name="emailOne" type="text" />
        </div>
        <div>
          <label htmlFor="firstNameTwo">
            <small>first name</small>
          </label>
          <input name="firstNameTwo" type="text" />
        </div>
        <div>
          <label htmlFor="emailTwo">
            <small>Email</small>
          </label>
          <input name="emailTwo" type="text" />
        </div>
        <div>
          <label htmlFor="firstNameThree">
            <small>first name</small>
          </label>
          <input name="firstNameThree" type="text" />
        </div>
        <div>
          <label htmlFor="emailThree">
            <small>Email</small>
          </label>
          <input name="emailThree" type="text" />
        </div>
        <div>
          <label htmlFor="firstNameFour">
            <small>first name</small>
          </label>
          <input name="firstNameFour" type="text" />
        </div>
        <div>
          <label htmlFor="emailFour">
            <small>Email</small>
          </label>
          <input name="emailFour" type="text" />
        </div>
        <div>
          <label htmlFor="firstNameFive">
            <small>first name</small>
          </label>
          <input name="firstNameFive" type="text" />
        </div>
        <div>
          <label htmlFor="emailFive">
            <small>Email</small>
          </label>
          <input name="emailFive" type="text" />
        </div>
        <Button variant="success" type="submit">
          add emails
        </Button>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    newEmails: state.emails
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
    },
    handleChange() {
      let arr = [{[firstName]: email}]
    }
  }
}
