import User from './User';
import { UserQualifications } from './UserQualifications';

export default class Guide extends User {

  qualifications:UserQualifications[];

  constructor();
  constructor(data);


  constructor(data?){
    super(data)
    this.qualifications = data.qualifications;
  }
}
