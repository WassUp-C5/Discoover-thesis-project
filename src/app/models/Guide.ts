import User from './User';

export default class Guide extends User {

  qualifications:[];

  constructor();
  constructor(data);


  constructor(data?){
    super(data)
    this.qualifications = data.qualifications
  }
}
