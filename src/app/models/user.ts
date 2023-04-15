export enum Role {
  User = 0,
  Admin = 1,
  Mainteiner = 2
}
export interface User {
    id?:number,
    name?:string,
    password?:string
    role?: number | Role;

}
