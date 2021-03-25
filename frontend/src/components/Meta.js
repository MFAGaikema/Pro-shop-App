import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title}) => {
  return (
    <Helmet>
    <title>Welcome to ProShop | {title}</title>
    <meta name='description' content='we sell stuff'/>
    <meta name='keywords' content='electronics'/>
  </Helmet>
  )
}

export default Meta
