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
  organizer:User | String;
  reserevations:TripReservation | String;
  waitingList:User[] | String[];
  travelers:User[] | String[];
  guides:User[] | String[];
  published:Boolean;
  createdAt:Date;
  updatedAt:Date;
}
