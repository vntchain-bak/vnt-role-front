import React from 'react'
import { Redirect } from 'react-router-dom'
import paths from '../utils/paths'
import { addLanguageUrl } from '../utils/helpers'

import { Consumer } from '../components/Context'

export default function Auth(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return Consumer(props => {
    const { isLogin } = props
    const {location: { pathname }} = props
    //isLogin && pathname !== '/login' || !isLogin && pathname === '/login' => <WrappedComponent />
    if (isLogin) {
      if (pathname === '/login'){
        return <Redirect to={addLanguageUrl(paths.home)} />
      }
    } else if (pathname !== '/login') {
      return <Redirect to={addLanguageUrl(paths.login)} />
    }
    // eslint-disable-next-line react/display-name
    return <WrappedComponent {...props} />
  })
}