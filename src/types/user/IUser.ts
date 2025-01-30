export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    document: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
