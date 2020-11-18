import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {showSingleShoutout} from '../store'

class SingleShoutout extends Component {
  constructor() {
    super()
    this.state = {
      show: true
    }
  }
  componentDidMount() {}
  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm sending shoutout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{emailToShow}</div>
            <div>{nameToShow}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              send invite
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
