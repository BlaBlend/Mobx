import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { Header } from 'components/Header'

describe('header', () => {
  describe('correct render for unlogined user', () => {
    const user = {
      id: 0,
      name: '',
    }
    const header = shallow(<Header user={user} />)

    it('have Sign In button', () => {
      expect(header.find('Button').props().children).toBe('Sign In')
    })
    it('have 2 links', () => {
      expect(header.find('Link')).toHaveLength(2)
    })
  })

  describe('correct render for logined user', () => {
    const user = {
      id: 2,
      name: 'User',
    }
    const header = shallow(<Header user={user} />)

    it('have sign out button', () => {
      expect(header.containsMatchingElement(<span>sign out</span>)).toBeTruthy()
    })
    it('displays the user namer', () => {
      expect(
        header.containsMatchingElement(<span>{user.name}</span>)
      ).toBeTruthy()
    })
  })

  describe('correct render for admin', () => {
    const user = {
      id: 1,
      name: 'admin',
    }
    const header = shallow(<Header user={user} />)

    it('have link to /admin', () => {
      expect(
        header.containsMatchingElement(
          <Link to="/admin">
            <Button>Admin panel</Button>
          </Link>
        )
      ).toBeTruthy()
    })
  })
})
