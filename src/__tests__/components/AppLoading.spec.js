import React from 'react'
import { shallow } from 'enzyme'
import AppLoading from 'components/AppLoading'

describe('app loadig', () => {
  const appLoading = shallow(<AppLoading />)

  it('renders properly', () => {
    expect(appLoading).toMatchSnapshot()
  })
})
