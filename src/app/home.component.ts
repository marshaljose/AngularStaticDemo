import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  salary: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">Dashboard</p>
          <h2>Employee Management</h2>
        </div>
        <button class="signout-btn" type="button" (click)="signOut()">Sign out</button>
      </header>

      <section class="form-panel">
        <h3>{{ isEditing ? 'Edit Employee' : 'Add Employee' }}</h3>

        <form (ngSubmit)="submitForm()" #employeeForm="ngForm" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>Name</label>
              <input type="text" name="name" [(ngModel)]="form.name" required />
            </div>

            <div class="field">
              <label>Role</label>
              <input type="text" name="role" [(ngModel)]="form.role" required />
            </div>

            <div class="field">
              <label>Department</label>
              <input type="text" name="department" [(ngModel)]="form.department" required />
            </div>

            <div class="field">
              <label>Email</label>
              <input type="email" name="email" [(ngModel)]="form.email" required />
            </div>

            <div class="field">
              <label>Salary</label>
              <input type="number" name="salary" [(ngModel)]="form.salary" required min="0" />
            </div>
          </div>

          <div class="actions">
            <button class="primary-btn" type="submit" [disabled]="!form.name || !form.role || !form.department || !form.email || !form.salary">
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
            <button class="secondary-btn" type="button" (click)="resetForm()">Cancel</button>
          </div>
        </form>
      </section>

      <section class="table-panel">
        <div class="table-header">
          <h3>Employee List</h3>
          <span>{{ employees.length }} records</span>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let employee of employees">
                <td>{{ employee.id }}</td>
                <td>{{ employee.name }}</td>
                <td>{{ employee.role }}</td>
                <td>{{ employee.department }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.salary | number:'1.0-0' }}</td>
                <td class="actions-cell">
                  <button class="small-btn edit" type="button" (click)="editEmployee(employee)">Edit</button>
                  <button class="small-btn delete" type="button" (click)="deleteEmployee(employee.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        padding: 32px 24px;
      }

      .page-shell {
        max-width: 1200px;
        margin: 0 auto;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding: 20px 24px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
      }

      .eyebrow {
        margin: 0;
        color: #2563eb;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.72rem;
      }

      h2, h3 {
        margin: 0;
        color: #0f172a;
      }

      .signout-btn,
      .primary-btn,
      .secondary-btn,
      .small-btn {
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s ease;
      }

      .signout-btn {
        background: #0f172a;
        color: white;
        padding: 10px 16px;
      }

      .signout-btn:hover,
      .primary-btn:hover,
      .secondary-btn:hover,
      .small-btn:hover {
        transform: translateY(-1px);
      }

      .form-panel,
      .table-panel {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        padding: 24px;
        margin-bottom: 24px;
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 18px;
        margin-top: 20px;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .field label {
        color: #334155;
        font-weight: 600;
      }

      input {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        background: #fff;
        color: #0f172a;
        font-size: 1rem;
      }

      .actions {
        display: flex;
        gap: 12px;
        margin-top: 22px;
      }

      .primary-btn {
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: white;
        padding: 12px 18px;
      }

      .secondary-btn {
        background: #e2e8f0;
        color: #0f172a;
        padding: 12px 18px;
      }

      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
      }

      .table-header span {
        color: #475569;
        font-weight: 600;
      }

      .table-wrap {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        padding: 14px 12px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      th {
        background: #f8fafc;
        color: #334155;
        font-size: 0.8rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      td {
        color: #0f172a;
      }

      .actions-cell {
        display: flex;
        gap: 8px;
        white-space: nowrap;
      }

      .small-btn {
        padding: 8px 10px;
        color: white;
        font-size: 0.8rem;
      }

      .small-btn.edit {
        background: #0ea5e9;
      }

      .small-btn.delete {
        background: #ef4444;
      }

      @media (max-width: 640px) {
        .topbar,
        .table-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
      }
    `
  ]
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  form: Employee = {
    id: 0,
    name: '',
    role: '',
    department: '',
    email: '',
    salary: 0
  };
  isEditing = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employees = [
      { id: 101, name: 'Alice Johnson', role: 'Senior Developer', department: 'Engineering', email: 'alice.johnson@company.com', salary: 95000 },
      { id: 102, name: 'Brian Smith', role: 'Project Manager', department: 'Operations', email: 'brian.smith@company.com', salary: 88000 },
      { id: 103, name: 'Carla Gomez', role: 'UX Designer', department: 'Design', email: 'carla.gomez@company.com', salary: 82000 },
      { id: 104, name: 'Daniel Lee', role: 'HR Specialist', department: 'Human Resources', email: 'daniel.lee@company.com', salary: 72000 },
      { id: 105, name: 'Eva Patel', role: 'QA Engineer', department: 'Engineering', email: 'eva.patel@company.com', salary: 78000 }
    ];
  }

  submitForm(): void {
    if (!this.form.name || !this.form.role || !this.form.department || !this.form.email || !this.form.salary) {
      return;
    }

    if (this.isEditing) {
      this.employees = this.employees.map((employee) =>
        employee.id === this.form.id ? { ...this.form } : employee
      );
    } else {
      const nextId = this.employees.length ? Math.max(...this.employees.map((e) => e.id)) + 1 : 1001;
      this.employees = [{ ...this.form, id: nextId }, ...this.employees];
    }

    this.resetForm();
  }

  editEmployee(employee: Employee): void {
    this.isEditing = true;
    this.form = { ...employee };
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    if (this.form.id === id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.form = { id: 0, name: '', role: '', department: '', email: '', salary: 0 };
  }

  signOut(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('/login');
  }
}
