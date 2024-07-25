import PropTypes from 'prop-types'

const Togglable = ({ buttonLabel, children, visible, setVisible }) => {
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }
  
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }
  
  Togglable.displayName = 'Togglable'

  export default Togglable