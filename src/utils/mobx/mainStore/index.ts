import { observable } from "mobx";
import user from '../stores/user'
import users from '../stores/users'

class MainStore {
    @observable user = user
    @observable users = users
}

const store = new MainStore()

export default store