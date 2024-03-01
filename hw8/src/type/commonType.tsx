export type StateType = {
    userid:string;
    username:string;
    isLogin:boolean; 
}

export type LoginAction = 
    {type:"RESET", value:StateType}
    | {type:"LOGIN", value:StateType}
    | {type:"LOGOUT", value:StateType};

export type PhotoType = {
    "albumId" : number;
    "id" : number;
    "thumbnailUrl" : string;
    "title" : string;
    "url" : string;
}