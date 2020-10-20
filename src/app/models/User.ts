export class User {
  id:string;
  bio: string;
  location: string;
  first_name:string;
  last_name:string;
  username:string;
  password:string;
  imageUrl:string;
  email:string;
  birthday:Date;
  gender:string;
  phone_number:string;
  qualifications:[];
  roles:string[] = ["user"];
  constructor()
  constructor(values)
  constructor(values?){
    if(values){
      this.location = values.location;
      this.first_name = values.first_name;
      this.last_name = values.last_name;
      this.username = values.username;
      this.password = values.password;
      this.email = values.email;
      this.birthday = values.birthday;
      this.gender = values.gender;
      this.phone_number = values.id;
    }
  }

}
