import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {showShoutouts} from '../store'

export class ShoutoutsList extends Component {
  componentDidMount() {
    this.props.showAllShoutouts()
  }

  render() {
    const shoutouts = this.props.shoutouts.data
    console.log(shoutouts)
    if (shoutouts !== [] && shoutouts !== undefined) {
      return (
        <div>
          {shoutouts.length ? (
            shoutouts.map(({name, message, id, email}) => (
              <div key={id}>
                <Link to={`/home/showShoutouts/${id}`}>{name}</Link>
                <div>
                  {message}
                  {email}
                </div>
              </div>
            ))
          ) : (
            <div>No shoutouts</div>
          )}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapState = state => {
  return {
    shoutouts: state.shoutouts
  }
}

const mapDispatch = dispatch => {
  return {
    showAllShoutouts() {
      dispatch(showShoutouts())
    }
  }
}

export default connect(mapState, mapDispatch)(ShoutoutsList)
