const User = require("./User");

class Organizer extends User {
  constructor(data) {
    super(data);
    this.bio = data.bio
  }
}

module.exports = Organizer;
