import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="brand-block">
          <div class="brand-icon">E</div>
          <h1>Employee Portal</h1>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" novalidate>
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            [(ngModel)]="username"
            required
            placeholder="admin"
          />

          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            [(ngModel)]="password"
            required
            placeholder="password@1"
          />

          <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>

          <button type="submit" [disabled]="!username || !password">Login</button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      .login-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%);
        padding: 24px;
      }

      .login-card {
        width: 100%;
        max-width: 420px;
        background: rgba(15, 23, 42, 0.78);
        border: 1px solid rgba(148, 163, 184, 0.3);
        border-radius: 18px;
        box-shadow: 0 18px 60px rgba(15, 23, 42, 0.35);
        padding: 32px 28px;
        backdrop-filter: blur(8px);
      }

      .brand-block {
        text-align: center;
        margin-bottom: 24px;
      }

      .brand-icon {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        margin: 0 auto 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #60a5fa, #2563eb);
        color: #fff;
        font-size: 2rem;
        font-weight: 700;
      }

      h1 {
        margin: 0;
        color: #f8fafc;
        font-size: 2rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      label {
        color: #e2e8f0;
        font-size: 0.92rem;
        font-weight: 600;
      }

      input {
        width: 100%;
        padding: 14px 16px;
        border-radius: 10px;
        border: 1px solid rgba(148, 163, 184, 0.35);
        background: rgba(15, 23, 42, 0.6);
        color: #f8fafc;
        font-size: 1rem;
      }

      input:focus {
        outline: 2px solid rgba(96, 165, 250, 0.8);
        border-color: transparent;
      }

      button {
        margin-top: 10px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #60a5fa, #2563eb);
        color: white;
        font-size: 1rem;
        font-weight: 700;
        padding: 14px 18px;
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      button:hover:not(:disabled) {
        transform: translateY(-1px);
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .error-message {
        min-height: 20px;
        color: #fca5a5;
        font-size: 0.9rem;
      }
    `
  ]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(): void {
    if (this.username === 'admin' && this.password === 'password@1') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/home');
      return;
    }

    this.errorMessage = 'Invalid username or password.';
    this.password = '';
  }
}
