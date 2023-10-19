export interface TopicContent {
    BodyContent: string,
    Type: string,
    Part: number
    Title?: string,
    Detail?: string,
    Link?: string,
    FilePath: string,
    ImgPath: string,
    ContentId?: number,
    FileName?: string,
    Folder?: string
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