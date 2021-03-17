import React, {useEffect, useState} from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
  const [removed, setRemoved] = useState('')
  
  useEffect(() => {
    setTimeout(() => {
      setRemoved('removed')
    }, 4000);
  }, [])

  return (
    <Alert className={`text-center ${removed}`} variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info'
}

export default Message



