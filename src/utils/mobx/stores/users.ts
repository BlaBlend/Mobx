import { makeAutoObservable } from "mobx";
import { IUser } from '../../../models/user'

interface IState {
    readonly users: IUser[]
}

const initState: IState = {
    users: [],
}

class Users {
  state: IState = initState;

  constructor() {
    makeAutoObservable(this);
  }

  set(payload: IState){
    this.state = payload // state.users
  }

  unset(){
    this.state = initState
  }
  
}

export default new Users();