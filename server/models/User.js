const mongoose = require("mongoose");
const db = require("./../../db/config.js");
var bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema(
  {
    first_name: String,
    qualifications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserQualification",
    }],
    last_name: String,
    username: {type: String, unique: true},
    password: { type: String, select: false },
    avatar: String,
    email: {type: String, unique: true},
    birthday: Date,
    gender: String,
    phone_number: String,
    bio: String,
    location: String,
    trips: [],
    tripReservations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TripReservation'
    }],
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
      this.avatar = data.avatar;
      this.email = data.email;
      this.birthday = data.birthday;
      this.gender = data.gender;
      this.phone_number = data.phone_number;
      this.location = data.location;
      this.roles = data.roles;
      this.qualifications = data.qualifications;
      this.avatar = data.avatar;
    }
  }

  // getQualifications() {
  //   return new Promise((resolve, reject) => {
  //     Qualifications.find({ _id: { $in: this.qualifications } }, (err, data) => {
  //      console.log( this);
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       resolve(data);
  //     });
  //   });
  // }

  saveUser() {
    return new Promise((resolve, reject) => {
      console.log("password ===> ", this.password);
      this.password = bcrypt.hashSync(this.password, 10)
      console.log("hashed password ===> ", this.password);
      super.save(
        {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          password: this.password,
          avatar: this.avatar,
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

  hasRole(role) {
    return this.roles.includes(role);
  }

  compare(currentPassword, savedPassword) {
    return bcrypt.compare(currentPassword, savedPassword);
  }
}
module.exports = User;
