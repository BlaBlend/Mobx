import React from 'react'
import { shallow } from 'enzyme'
import Footer from 'components/Footer'

describe('footer', () => {
  const footer = shallow(<Footer />)

  it('renders properly', () => {
    expect(footer).toMatchSnapshot()
  })
})
