import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patients } from '../models/item2.model';

@Injectable({ providedIn: 'root' })
export class Item2Service {
  private col;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'item2s');
  }

  getAll(): Observable<Patients[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Patients[]>;
  }

  add(item: Patients) { return addDoc(this.col, item); }
  update(id: string, item: Partial<Patients>) { return updateDoc(doc(this.firestore, 'item2s', id), item); }
  delete(id: string) { return deleteDoc(doc(this.firestore, 'item2s', id)); }
}
