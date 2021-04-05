import React from 'react'
import { Layout, Button, Avatar } from 'antd'
import { LayoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import * as usersActions from 'actions/users'
import store from '../../utils/mobx/mainStore'

import styles from './styles.module.scss'

export function Header(): React.ReactElement {
  const user = store.user.state

  return (
    <Layout.Header>
      <div className={styles.header}>
        <span>
          <Link to="/">
            <LayoutOutlined /> Application template
          </Link>
        </span>
        {user.id ? (
          <div className={styles.user}>
            <Avatar icon={<div></div>} className={styles.avatar} />
            <span>{user.name}</span>
            {user.id === 1 && (
              <span>
                &nbsp;
                <Link to="/admin">
                  <Button type="dashed" size="small">
                    Admin panel
                  </Button>
                </Link>
              </span>
            )}
            ,&nbsp;
            <span className={styles.signOut} onClick={usersActions.unsetUser}>
              sign out
            </span>
            .
          </div>
        ) : (
            <Link to="/login">
              <Button type="primary" icon="login">
                Sign In
            </Button>
            </Link>
          )}
      </div>
    </Layout.Header>
  )
}

export default Header
