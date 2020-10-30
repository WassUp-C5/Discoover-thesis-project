import User from './User';

export default class Traveler extends User {
  tripReservations: [];
  constructor();
  constructor(data);

  constructor(data?) {
    super(data);
    if (data) {
      this.tripReservations = data.tripReservations;
    }
  }
}
