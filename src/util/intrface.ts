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
    IsArticle?: boolean,
    IsPublish?: boolean,
    SaveOn?: Date,
    PublishOn?: Date,
    AllTags?: Array<string>,
    Tags?: string
}  

export interface DailyParagraph {
  Content: string,
  Link: string,
  Note?: string,
  Title: string
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

interface License {
    name: string;
    url: string;
  }
  
  interface Phonetic {
    text?: string;
    audio: string;
    sourceUrl: string;
    license: License;
  }
  
  interface Definition {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
  }
  
  interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
  }
  
  export interface DictionaryResponse {
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
  }