import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Appointments } from '../models/item3.model';

@Injectable({ providedIn: 'root' })
export class Item3Service {
  private col;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'item3s');
  }

  getAll(): Observable<Appointments[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Appointments[]>;
  }

  add(item: Appointments) { return addDoc(this.col, item); }
  update(id: string, item: Partial<Appointments>) { return updateDoc(doc(this.firestore, 'item3s', id), item); }
  delete(id: string) { return deleteDoc(doc(this.firestore, 'item3s', id)); }
}
