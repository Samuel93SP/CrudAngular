import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item1Service } from '../../services/item1.service';
import { Doctors } from '../../models/item1.model';

@Component({
  selector: 'app-item1-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item1-list.html',
  styleUrl: './item1-list.css'
})
export class Item1ListComponent implements OnInit {
  items: Doctors[] = [];
  form: Doctors = { name: '', speciality: '' };
  editingId: string | null = null;
  submitted = false;

  constructor(private svc: Item1Service, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.svc.getAll().subscribe(data => {
      this.items = data;
      this.cdr.detectChanges();
    });
  }

  save() {
    this.submitted = true;
    if (!this.form.name || !this.form.speciality) return;
    if (this.editingId) {
      this.svc.update(this.editingId, this.form).then(() => this.reset());
    } else {
      this.svc.add(this.form).then(() => this.reset());
    }
  }

  edit(item: Doctors) {
    this.editingId = item.id!;
    this.form = { name: item.name, speciality: item.speciality };
  }

  delete(id: string) {
    if (confirm('¿Eliminar?')) this.svc.delete(id);
  }

  reset() {
    this.form = { name: '', speciality: '' };
    this.editingId = null;
    this.submitted = false;
  }
}
