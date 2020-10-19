export class User {
  id:string;
  first_name:string;
  last_name:string;
  username:string;
  password:string;
  imageUrl:string;
  email:string;
  birthday:Date;
  bio:string;
  gender:string;
  phone_number:string;
  roles:string[] = ["user"];
}
