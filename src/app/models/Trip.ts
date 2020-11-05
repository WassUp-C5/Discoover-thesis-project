import Guide from './Guide';
import { TripReservation } from './TripReservation';
import User from './User';

export default class Trip {
  _id: String;
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
  guides:Guide[];
  published:Boolean;
  createdAt:Date;
  updatedAt:Date;
}
