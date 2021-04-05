import React from 'react'
import { Switch, Route } from 'react-router'
import { Layout } from 'antd'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Login from './Login'
import Posts from './Posts'
import Post from './Post'

import styles from './styles.module.scss'

export default function Public(): React.ReactElement {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout.Content className={styles.content}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/post/:id" component={Post} />
          <Route path="/" component={Posts} />
        </Switch>
      </Layout.Content>
      <Footer />
    </Layout>
  )
}