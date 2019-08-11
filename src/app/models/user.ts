import { Group } from './group';

export class User {
    
    public _id: string;
    public UserId: string;
    public Name: string;
    public Email: string;
    public Active: boolean;
    public Group: Group[];
    public PhoneNo: string;
    public Password: string;
    public Role: string;
    public CreatedDate: Date;
    public UpdatedDate: Date;
    
}
