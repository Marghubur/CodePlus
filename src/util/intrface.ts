export interface TopicContent {
    FileName: string,
    BodyContent: string,
    Folder: string,
    Type: string,
    Part: number
    Title?: string,
    Img?: string,
    Detail?: string,
    Link?: string,
    Id?: number
}  

export interface IBreadCrumb {
    label: string;
    url: string;
}

export interface UserDetail {
    UserName: string,
    Email: string,
    Password: string,
    Id: number,
    RoleId: number
}

export enum Role {
    Admin = 1,
    User = 2
}