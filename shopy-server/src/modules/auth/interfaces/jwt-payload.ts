import { Role } from "src/modules/role/role.entity";

export interface JwtPayload {
    id: number,
    username: string,
    email: string,
    role: Role,
    expiratioDate?: Date
}