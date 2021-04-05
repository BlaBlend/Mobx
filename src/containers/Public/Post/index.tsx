// components and utils
import React, { Component } from 'react'
import {
  notification,
  message,
  PageHeader,
  Row,
  Col,
  Skeleton,
  Rate,
  Comment,
  Tooltip,
  List,
  Avatar,
} from 'antd'
import { WarningFilled } from '@ant-design/icons'
import { Link, RouteComponentProps } from 'react-router-dom'
import history from 'utils/history'
import moment from 'moment'

// actions and types
import * as usersActions from 'actions/users'
import * as postsActions from 'actions/posts'
import * as commentsActions from 'actions/comments'
import { IUser, IComment, IPost } from 'models'

// styles and images
import styles from './styles.module.scss'

interface IRouterProps {
  id: string
}
interface IProps extends RouteComponentProps<IRouterProps> {
  comment: IComment
  post: IPost
  user: IUser
}

interface IState {
  user: IUser | null
  comments: IComment[]
  posts: IPost[]
  post: IPost | null
  loading: boolean
}

class Post extends Component<IProps, IState> {
  state: IState = {
    user: null,
    comments: [],
    posts: [],
    post: null,
    loading: true,
  }

  componentDidMount = () => {
    this.loadPost()
  }

  componentDidUpdate = (prevProps: IProps) => {
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.loadPost()
  }

  loadPost = async () => {
    this.setState({ loading: true })
    const hideMessage = message.loading('Loading post...')

    try {
      const data = await Promise.all([
        postsActions.getPost(+this.props.match.params.id),
        commentsActions.getCommentsByPost(+this.props.match.params.id),
      ])

      const post = data[0]
      const comments = data[1]

      const dataByUser = await Promise.all([
        usersActions.getUser(post.userId),
        postsActions.getPostsByUser(post.userId),
      ])

      const user = dataByUser[0]
      const posts = dataByUser[1]

      this.setState({ user, comments, posts, post })
    } catch (e) {
      notification.open({
        message: 'Fetch post error',
        description: e.message || e,
        icon: <WarningFilled style={{ color: 'red' }} />,
      })
    } finally {
      this.setState({ loading: false }, () => {
        hideMessage()
      })
    }
  }

  render = () => {
    const { user, post, posts, comments, loading } = this.state

    const commentsList =
      comments.length &&
      comments.map(comment => ({
        actions: [<span>Reply to</span>],
        author: comment.email,
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <p>{comment.body}</p>,
        datetime: (() => {
          const title = moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD HH:mm:ss')
          const fromNow = moment().subtract(1, 'days').fromNow()

          return (
            <Tooltip title={title}>
              <span>{fromNow}</span>
            </Tooltip>
          )
        })(),
      }))

    return !post || !user || loading ? (
      <div>
        <Skeleton />
      </div>
    ) : (
        <div>
          <PageHeader
            onBack={() => history.push('/')}
            title={post && post.title}
            subTitle={`By ${user.name} from ${user.company.name}`}
          />
          <Row className={styles.content}>
            <Col span={10}>
              <p>{post.body}</p>
              <Rate value={4} />
              {commentsList && (
                <List
                  header={`${commentsList.length} comments`}
                  itemLayout="horizontal"
                  dataSource={commentsList}
                  renderItem={item => (
                    <Comment
                      actions={item.actions}
                      author={item.author}
                      avatar={item.avatar}
                      content={item.content}
                      datetime={item.datetime}
                    />
                  )}
                />
              )}
            </Col>
            <Col span={14} className={styles.posts}>
              <List
                itemLayout="horizontal"
                dataSource={posts}
                renderItem={post => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://picsum.photos/300/200/?random" />
                      }
                      title={<Link to={`/post/${post.id}`}>{post.title}</Link>}
                      description={post.body}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      )
  }
}

export default Post
