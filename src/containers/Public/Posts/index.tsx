import React, { Component } from 'react'
import { notification, Empty, Button, Input, Row, Col, message } from 'antd'
import PostCard from './PostCard'
import { WarningFilled } from '@ant-design/icons'

import * as postsActions from 'actions/posts'
import { IPost } from 'models/post'

import styles from './styles.module.scss'

interface IState {
  search: string
  posts: IPost[]
}

class Posts extends Component<{}, IState> {
  state: IState = {
    search: '',
    posts: [],
  }

  componentDidMount = () => {
    this.loadPosts()
  }

  loadPosts = async () => {
    const hideMessage = message.loading('Loading posts list...')

    try {
      const posts = await postsActions.getPosts()
      this.setState({ posts })
    } catch (e) {
      notification.open({
        message: 'Fetch list error',
        description: e.message || e,
        icon: <WarningFilled style={{ color: 'red' }} />,
      })
    } finally {
      hideMessage()
    }
  }

  onClickLoad = () => {
    this.setState({ search: '' }, () => {
      this.loadPosts()
    })
  }

  filterPosts = () => {
    let { search, posts } = this.state
    if (search === '') return posts

    search = search.toLowerCase()

    return posts.filter(post => {
      const title = post.title.toLowerCase()
      const body = post.body.toLowerCase()

      return title.indexOf(search) > -1 || body.indexOf(search) > -1
    })
  }

  render = () => {
    const { search } = this.state
    const posts = this.filterPosts()

    return (
      <div>
        <Row>
          <Col span={8} offset={8}>
            <Input.Search
              placeholder="Search by post name and description"
              size="large"
              onSearch={value => console.log(value)}
              className={styles.search}
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </Col>
        </Row>
        {posts.length > 0 ? (
          <div className={styles.posts}>
            {posts.map(post => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
            <Empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              description={
                <span>
                  {search.length > 0
                    ? 'Nothing found by your request'
                    : 'List is empty'}
                </span>
              }
            >
              <Button type="primary" onClick={this.onClickLoad}>
                Reload list
            </Button>
            </Empty>
          )}
      </div>
    )
  }
}

export default Posts
