import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item1Service } from '../../services/item1.service';
import { Item2Service } from '../../services/item2.service';
import { Item3Service } from '../../services/item3.service';
import { Doctors } from '../../models/item1.model';
import { Patients } from '../../models/item2.model';
import {Appointments} from '../../models/item3.model';

@Component({
  selector: 'app-item3-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item3-list.html',
  styleUrl: './item3-list.css'
})
export class Item3ListComponent implements OnInit {
  item1s: Doctors[] = [];
  item2s: Patients[] = [];
  items: Appointments[] = [];
  form: Appointments = { doctorId: '', patientId: '', dateTime: '' };
  editingId: string | null = null;
  submitted = false;

  constructor(
    private svc1: Item1Service,
    private svc2: Item2Service,
    private svc3: Item3Service,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.svc1.getAll().subscribe(data => { this.item1s = data; this.cdr.detectChanges(); });
    this.svc2.getAll().subscribe(data => { this.item2s = data; this.cdr.detectChanges(); });
    this.svc3.getAll().subscribe(data => { this.items = data; this.cdr.detectChanges(); });
  }

  getItem1Nombre(id: string) {
    return this.item1s.find(i => i.id === id)?.name || '';
  }

  getItem2Nombre(id: string) {
    return this.item2s.find(i => i.id === id)?.name || '';
  }

  save() {
    this.submitted = true;
    if (!this.form.doctorId || !this.form.patientId || !this.form.dateTime) return;
    if (this.editingId) {
      this.svc3.update(this.editingId, this.form).then(() => this.reset());
    } else {
      this.svc3.add(this.form).then(() => this.reset());
    }
  }

  edit(item: Appointments) {
    this.editingId = item.id!;
    this.form = { doctorId: item.doctorId, patientId: item.patientId, dateTime: item.dateTime };
  }

  delete(id: string) {
    if (confirm('¿Delete?')) this.svc3.delete(id);
  }

  reset() {
    this.form = { doctorId: '', patientId: '', dateTime: '' };
    this.editingId = null;
    this.submitted = false;
  }
}
