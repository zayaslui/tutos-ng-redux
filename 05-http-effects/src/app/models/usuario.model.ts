//"data": {
//    "id": 2,
//    "email": "janet.weaver@reqres.in",
//    "first_name": "Janet",
//    "last_name": "Weaver",
//    "avatar": "https://reqres.in/img/faces/2-image.jpg"
//},
//"support": {
//    "url": "https://reqres.in/#support-heading",
//    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
//}


export class Usuario {
    constructor(
        public id:string,
        public email:string,
        public first_name:string,
        public last_name:string,
        public avatar:string,
    ){}
}