import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, UsuarioAPI } from '../services/auth.service'; // Ajusta ruta si es necesario
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: UsuarioAPI | null = null;

  modoEdicion = false;
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  mensajeError: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario() || this.authService.obtenerUsuarioDesdeStorage();
  }


  habilitarEdicion() {
    this.modoEdicion = true;
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.mensajeError = '';
  }

  guardarCambios() {
    if (this.nuevaContrasena && this.nuevaContrasena !== this.confirmarContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    // Aquí actualizas datos localmente o haces PUT al backend
    console.log('Datos actualizados (simulado):', this.usuario);

    this.authService.guardarUsuario(this.usuario!);
    this.cancelarEdicion();
  }

  salir() {
    this.authService.logout(); // Asegúrate que este método limpie sesión/token
    this.router.navigate(['/panel']); // Ajusta la ruta según tu app
  }
}
