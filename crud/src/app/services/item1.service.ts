import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Doctors } from '../models/item1.model';

@Injectable({ providedIn: 'root' })
export class Item1Service {
  private col;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'item1s');
  }

  getAll(): Observable<Doctors[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Doctors[]>;
  }

  add(item: Doctors) { return addDoc(this.col, item); }
  update(id: string, item: Partial<Doctors>) { return updateDoc(doc(this.firestore, 'item1s', id), item); }
  delete(id: string) { return deleteDoc(doc(this.firestore, 'item1s', id)); }
}
