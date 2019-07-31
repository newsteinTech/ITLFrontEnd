export class ReqUser {

    Name:string;
    Email:string;
    PhoneNo:string;
    UserId:string;
    Group:Array<any>;
    Password:string;
    Role:string;
    Active:boolean;

    constructor(Name:string,Email:string,PhoneNo:string,UserId:string,Group:Array<any>,Password:string,Role:string){

        this.Name = Name;
        this.Email = Email;
        this.PhoneNo = PhoneNo;
        this.UserId = UserId;
        this.Group = Group;
        this.Password = Password;
        this.Role = Role;
        this.Active = true;
        // this.Group.push(Group);
    }

}
