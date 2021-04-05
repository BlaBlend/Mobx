import { api } from '../config'
import { IPost } from 'models/post'

export async function getPosts(): Promise<IPost[]> {
  let res = await api.get('/posts')
  if (res.status !== 200) throw new Error(`Can't fetch post list`)

  return res.data
}

export async function getPost(id: number): Promise<IPost> {
  let res = await api.get(`/posts/${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch post`)

  return res.data
}

export async function getPostsByUser(id: number): Promise<IPost[]> {
  let res = await api.get(`/posts?userId=${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch post list by user id`)

  return res.data
}
