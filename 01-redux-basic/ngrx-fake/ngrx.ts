export interface Action {
    type        : String;
    payload?    : any;
}

export interface Reducer<T>{
    (state: T, action:Action): T
}