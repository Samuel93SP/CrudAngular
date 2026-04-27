import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item2Service } from '../../services/item2.service';
import { Patients } from '../../models/item2.model';

@Component({
  selector: 'app-item2-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item2-list.html',
  styleUrl: './item2-list.css'
})
export class Item2ListComponent implements OnInit {
  items: Patients[] = [];
  form: Patients = { name: '', email: '' };
  editingId: string | null = null;
  submitted = false;

  constructor(private svc: Item2Service, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.svc.getAll().subscribe(data => {
      this.items = data;
      this.cdr.detectChanges();
    });
  }

  save() {
    this.submitted = true;
    if (!this.form.name || !this.form.email) return;
    if (this.editingId) {
      this.svc.update(this.editingId, this.form).then(() => this.reset());
    } else {
      this.svc.add(this.form).then(() => this.reset());
    }
  }

  edit(item: Patients) {
    this.editingId = item.id!;
    this.form = { name: item.name, email: item.email };
  }

  delete(id: string) {
    if (confirm('¿Delete?')) this.svc.delete(id);
  }

  reset() {
    this.form = { name: '', email: '' };
    this.editingId = null;
    this.submitted = false;
  }
}
