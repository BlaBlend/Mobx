import { api } from '../config'
import store from '../utils/mobx/mainStore'
import { IUser } from 'models/user'
import history from 'utils/history'

// common http request
export async function getUser(id: number): Promise<IUser> {
  let res = await api.get(`/users/${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch user by id ${id}`)

  return res.data
}

// http request + redux store
export async function getUsers(): Promise<void> {
  let res = await api.get('/users')
  if (res.status !== 200) throw new Error(`Can't fetch user list`)

  store.users.set({users: res.data})
}

// common redux action
export function setUser(user: IUser): void {
  store.user.set(user)
  localStorage.setItem('user', JSON.stringify(user))
}

export function unsetUser(): void {
  store.user.unset()
  localStorage.removeItem('user')
  history.replace('/login')
}

export async function authUser(): Promise<IUser | null> {
  try {
    let userStr: string | null = localStorage.getItem('user')
    if (!userStr) return null

    let user = JSON.parse(userStr)
    setUser(user)

    return user
  } catch (e) {
    return null
  }
}
