import React from 'react'
import { Route, Redirect } from 'react-router'
import { shallow } from 'enzyme'
import { PrivateRoute } from 'components/PrivateRoute'

describe('private route', () => {
  const routeProps = { path: '/admin', render: () => <div /> }
  describe('access is open', () => {
    const privateRoute = shallow(
      <PrivateRoute user={{ id: 1 }} {...routeProps} />
    )

    it('render route', () => {
      expect(
        privateRoute.containsMatchingElement(<Route {...routeProps} />)
      ).toBeTruthy()
    })
  })

  describe('access is close', () => {
    it('render redirect', () => {
      const privateRoute = shallow(
        <PrivateRoute user={{ id: 0 }} {...routeProps} />
      )
      expect(privateRoute.contains(<Redirect to="/" />)).toBeTruthy()
    })
    it('render redirect with redirectPath', () => {
      const privateRoute = shallow(
        <PrivateRoute user={{ id: 0 }} {...routeProps} redirectTo="/admin" />
      )

      expect(privateRoute.contains(<Redirect to="/admin" />)).toBeTruthy()
    })
  })
})
