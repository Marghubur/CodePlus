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
    IsArticle?: boolean
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


export class Notification {  
    type: NotificationType;  
    message: string;  
} 

export enum NotificationType {  
Success,  
Error,  
Info,  
Warning  
}