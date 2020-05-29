import {DaoInterface} from "@/requests/interfaces/dao.interface";
import {UserInterface} from "@/requests/interfaces/user.interface";
import axios from "axios"
import {EnvironmentConstants} from "@/constants/environmentConstants";
import {Filter} from "@/utils/filter";

const URL = EnvironmentConstants.HOST+"/api/v1/users";

export class UsersDao implements DaoInterface{

    async delete(id: number): Promise<boolean> {
        return (await axios.get(URL + "/" +id)).data;
    }

    async get(id: number): Promise<UserInterface> {
        return (await axios.get(URL + "/" +id)).data;
    }

    async getAll(): Promise<UserInterface[]> {
        return (await axios.get(URL)).data;
    }

    async getAllFiltered(filters: Filter): Promise<UserInterface[]> {
        return (await axios.get(URL+"?"+filters.get())).data;
    }

    async getByFilters(filters: Filter): Promise<UserInterface> {
        return (await axios.get(URL+"?"+filters.get())).data;
    }

    async post(data: {}): Promise<UserInterface> {
        return (await axios.post(URL, data)).data;
    }

    async put(id: number, data: {}): Promise<boolean> {
        return (await axios.get(URL + "/" +id, data)).data;
    }

}