const mongoose = require("mongoose");
const db = require("./../../db/config.js");
var bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    imageUrl: String,
    email: String,
    birthday: Date,
    gender: String,
    roles: [],
  },
  {
    timestamps: true,
  }
);

const MongoUser = mongoose.model("User", usersSchema);
class User extends MongoUser {
  constructor(data) {
    super();
    if (data) {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.username = data.username;
      this.password = data.password;
      this.imageUrl = data.imageUrl;
      this.email = data.email;
      this.birthday = data.birthday;
      this.gender = data.gender;
      this.roles = data.roles;
    }
  }

  save() {
    return new Promise((resolve, reject) => {
      console.log("password ===> ", this.password);
      this.password = bcrypt.hashSync(this.password, 10);
      super.save(
        {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          password: this.password,
          imageUrl: this.imageUrl,
          email: this.email,
          birthday: this.birthday,
          gender: this.gender,
          roles: this.roles,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );
    });
  }

  compare(currentPassword) {}
}
module.exports = User;
