import {UserStateInterface} from "@/store/users/interfaces/user.state.interface";
import {User} from "@/requests/users/User";

export const USER_EMPTY_STATE: UserStateInterface = {
  user: new User()
};

export const USER_ONE_STATE: UserStateInterface = {
    user: new User(1)
};