import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/items.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = environment.apiUrl+'NewsFeed';

  constructor(private http: HttpClient) {}

  
 
  getTopStories(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/top-stories`);
  }
 
  
}
