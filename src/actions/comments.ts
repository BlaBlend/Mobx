import { api } from '../config'
import { IComment } from 'models/comment'

export async function getCommentsByPost(id: number): Promise<IComment[]> {
  let res = await api.get(`/comments?postId=${id}`)
  if (res.status !== 200)
    throw new Error(`Can't fetch comments list by post id`)

  return res.data
}
