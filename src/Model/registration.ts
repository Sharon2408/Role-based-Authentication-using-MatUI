export interface Registration {
    id:number;
    firstname:string;
    email:string;
    password:string;
    confirm_paswword:string;
    isActive:boolean;
    assigned_tasks:Array<string>;
}

export interface User_Task{
    id:number;
    task:string;
}

