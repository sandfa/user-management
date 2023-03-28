import * as mongoDB from 'mongodb'


export interface user {
    userid: string
    firstname: string
    lastname: string
    mail: string
}

export interface test {
    userid: mongoDB.ObjectId
    firstname: string
    lastname: string
    mail: string
}




export interface responseObject {
    code: string,
    message: string,
    data?: any
}