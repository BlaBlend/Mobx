import React, { Component } from 'react'
import { Select, Button, Alert, message, notification } from 'antd'
import { History } from 'history'
import {
  WarningFilled,
  InfoCircleOutlined,
  LoginOutlined,
} from '@ant-design/icons'

import * as usersActions from 'actions/users'
import store from '../../../utils/mobx/mainStore'

import styles from './styles.module.scss'
import { observer } from 'mobx-react'

interface IProps {
  history: History
}
interface IState {
  userId: number
  loading: boolean
}

class Login extends Component<IProps, IState> {
  state = {
    userId: 0,
    loading: true,
  }

  get user(){
    return store.user.state
  }

  get users(){
    console.log(store)
    return store.users.state.users
  }

  componentDidMount = () => {
    if (this.user.id) return this.props.history.replace('/')

    this.loadUsers()
  }

  loadUsers = async () => {
    this.setState({ loading: true })
    const hideMessage = message.loading('Loading users list...')

    try {
      await usersActions.getUsers()
    } catch (e) {
      notification.open({
        message: 'Fetch users list error',
        description: e.message || e,
        icon: <WarningFilled style={{ color: 'red' }} />,
      })
    } finally {
      hideMessage()
      this.setState({ loading: false })
    }
  }

  onChangeUser = (userId: number) => {
    this.setState({ userId })
  }

  onClickSignIn = () => {
    if (!this.state.userId) {
      return message.info(`Please, select user`, 3)
    }

    const user = this.users.find(user => user.id === this.state.userId)
    if (!user) return message.error('Signed error')
    usersActions.setUser(user)
    this.props.history.replace('/')

    message.success(`Perfect! You signed in as ${user.name}`, 3)
    if (user.id === 1) {
      notification.open({
        message: 'Admin section',
        description:
          'You have admin permissions. You can go to admin section using link "Admin section" in header',
        icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
      })
    }
  }

  render = () => {
    return (
      <div className={styles.login}>
        <div className={styles.form}>
          <LoginOutlined className={styles.icon} />
          <Alert
            message="Admin section available for Leanne Graham."
            type="info"
            className={styles.alert}
          />
          <Select
            className={styles.search}
            size="large"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onChangeUser}
            value={this.state.userId || undefined}
          // filterOption={(input, option) =>
          //   option.props.children
          //     .toLowerCase()
          //     .indexOf(input.toLowerCase()) >= 0
          // }
          >
            {this.users.map(user => (
              <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            size="large"
            loading={this.state.loading}
            onClick={this.onClickSignIn}
            block
          >
            {' '}
            Sign In{' '}
          </Button>
        </div>
      </div>
    )
  }
}

export default observer(Login)