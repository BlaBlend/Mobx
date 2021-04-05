import { makeAutoObservable } from "mobx";
import { IUser } from '../../../models/user'

type State = Readonly<IUser>

const initState: State = {
    id: 0,
    name: '',
    company: {
      name: '',
    },
}

class User {
  state: State = initState;

  constructor() {
    makeAutoObservable(this);
  }

  set(payload: Readonly<IUser>){
    this.state = payload
  }

  unset(){
    this.state = initState
  }
  
}

export default new User();
