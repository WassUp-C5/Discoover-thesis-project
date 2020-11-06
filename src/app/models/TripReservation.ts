import Trip from './Trip';
import User from './User';

export class TripReservation {
  confirmed: Boolean;
  traveler: User;
  trip: Trip;
  createdAt: Date;
  updatedAt: Date;
}
