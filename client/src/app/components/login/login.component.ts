import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // Recibir el valor de `isLoggedIn` como input
  @Input() isLoggedIn: boolean = false;

  // Emitir el evento de login
  @Output() login = new EventEmitter<void>();

  // Método para ejecutar login cuando el usuario lo solicite
  onLogin() {
    this.login.emit(); // Emitir el evento de login al componente padre
  }
}
