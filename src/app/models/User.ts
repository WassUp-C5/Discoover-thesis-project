export default class User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  avatar: string = '../../assets/avatar.png';
  email: string;
  birthday: Date;
  bio: string;
  gender: string;
  location: string;
  phone_number:string;
  roles:string[] = ["user"];
  constructor()
  constructor(values)
  constructor(values?){
    if(values){
      this.id = values._id;
      this.location = values.location;
      this.first_name = values.first_name;
      this.last_name = values.last_name;
      this.username = values.username;
      this.password = values.password;
      this.email = values.email;
      this.birthday = values.birthday;
      this.gender = values.gender;
      this.phone_number = values.phone_number;
      this.bio = values.bio;
      this.avatar = values.avatar;
    }
  }

}
