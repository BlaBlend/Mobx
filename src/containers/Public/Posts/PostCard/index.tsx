import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

import { IPost } from 'models/post'

export default function PostCard(post: IPost): React.ReactElement {
  return (
    <Link to={`/post/${post.id}`}>
      <Card
        key={post.id}
        hoverable
        cover={
          <img alt="example" src="https://picsum.photos/300/200/?random" />
        }
      >
        <Card.Meta title={post.title} description={post.body} />
      </Card>
    </Link>
  )
}
