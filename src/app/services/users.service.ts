import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Organizer from '../models/Organizer';
import Traveler from './../models/Traveler';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getOrganizer(id: string) {
    return this.http.get<Organizer>(`/api/users/organisers/${id}`);
  }

  getTraveler(id: string): Observable<Traveler> {
    return this.http.get<Traveler>(`/api/users/travelers/${id}`);
  }

  getCurrentConnectedUser(id, role) {
    return this.http.get(`/api/users/${role}s/${id}`);
  }

  setOrganizerData(data) {
    return this.http.put(`/api/users/organizer//edit`, data);
  }

  setUserAvatar(id, avatarFile: File) {
    const formData: FormData = new FormData();
    formData.append('file', avatarFile, avatarFile.name);
    return this.http.put(`/api/users/${id}/edit/avatar`, formData);
  }
}
