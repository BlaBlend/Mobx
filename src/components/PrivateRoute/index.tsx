import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { message } from 'antd'

import store from '../../utils/mobx/mainStore'
import { observer } from 'mobx-react'

interface IProps {
  roles: string[]
  message?: string
  redirectTo?: string | object
}

// connect((state: IStoreState) => ({ user: state.user }))

export const PrivateRoute = (
  props: RouteProps & IProps
): React.ReactElement => {
  let user = store.user.state
  let allow = false

  // here private logic ...
  // const userRoles = ['customer']
  // if (userRoles.some(userRole => props.roles.includes(userRole))) allow = true
  allow = !!(user.id && user.id === 1)

  // show a notification
  if (!allow)
    message.warning(
      props.message ? props.message : `You have not access to this page`
    )

  return allow ? (
    <Route {...props} />
  ) : (
    <Redirect to={props.redirectTo ? props.redirectTo : '/'} />
  )
}

export default observer(PrivateRoute)
