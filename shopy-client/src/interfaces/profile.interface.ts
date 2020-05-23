export interface Profile {
    name?: string;
    email?: string;
    picture?: string;
}

//pruebas para "Mi perfil"
export interface ProfileInterface {
    name?: string;
    lastName?:string;
    email?: string;
    picture?: string;
    date?: string;
    address?: Address
};

export interface Address{
    primaryLine: string;
    secondaryLine?: string;
    city: string;
    state: string;
    zipCode: number;
}