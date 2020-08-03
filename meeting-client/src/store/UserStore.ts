import { createContext } from "react";
import { observable, action } from "mobx";
import IUser from "../models/IUser";
import agent from "../api/agent";
const { UserAgent } = agent;
class UserStore {
  @observable users: IUser[] | null = null;
  @observable loading = false;

  @observable currentUser: IUser | null = null;

  @action loadUsers = async () => {
    try {
      this.loading = true;
      this.users = await UserAgent.list();
      this.currentUser = this.users[0];
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  };
}

export default createContext(new UserStore());
