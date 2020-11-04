import { TripReservation } from './TripReservation';
import User from './User';

export default class Trip {
  id: String;
  title: String;
  location: String;
  price: Number;
  maxTravelers: Number;
  date: String;
  description: String;
  organizer:User;
  reservations:TripReservation;
  waitingList:User[];
  travelers:User[];
  guides:User[];
  published:Boolean;
  createdAt:Date;
  updatedAt:Date;
}
