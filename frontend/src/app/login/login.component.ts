import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


interface UsuarioAPI {
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  id: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Propiedades existentes del login
  usuario: string = '';
  contrasena: string = '';
  error: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  // Propiedades para el modal de registro
  showRegisterModal: boolean = false;
  nombreCompleto: string = '';
  correo: string = '';
  nuevoUsuario: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  aceptarTerminos: boolean = false;
  registerError: string = '';
  showRegisterPassword: boolean = false;

  // Cambia a true si tu API devuelve { data: [...] }
  private apiResponseHasDataWrapper = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async login(): Promise<void> {
  this.error = '';

  if (!this.usuario.trim()) {
    this.error = 'El usuario es requerido';
    return;
  }

  if (!this.contrasena.trim()) {
    this.error = 'La contraseña es requerida';
    return;
  }

  if (this.contrasena.length < 4) {
    this.error = 'La contraseña debe tener al menos 4 caracteres';
    return;
  }

  this.isLoading = true;

  try {
    const response: any = await this.authService.login(this.usuario, this.contrasena).toPromise();
    const usuarioValido: UsuarioAPI = response.usuario;

    if (!usuarioValido) {
      this.error = 'Usuario o contraseña incorrectos';
      this.isLoading = false;
      return;
    }

    // ✅ Solo usamos el AuthService para guardar
    this.authService.guardarUsuario(usuarioValido);

    // ✅ Redirigir según rol
    if (usuarioValido.rol === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/panel']);
    }

  } catch (error: any) {
    if (error.status === 401) {
      this.error = 'Usuario o contraseña incorrectos';
    } else {
      this.error = 'Error al conectar con el servidor.';
      console.error(error);
    }
  } finally {
    this.isLoading = false;
  }
}

  registrarse(): void {
    const errores: string[] = [];

    if (!this.nombreCompleto.trim()) {
      errores.push('El nombre completo es requerido');
    }

    if (!this.correo.trim()) {
      errores.push('El correo electrónico es requerido');
    }

    if (!this.nuevoUsuario.trim()) {
      errores.push('El nombre de usuario es requerido');
    }

    if (!this.nuevaContrasena.trim()) {
      errores.push('La contraseña es requerida');
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      errores.push('Las contraseñas no coinciden');
    }

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;
    if (!regex.test(this.nuevaContrasena)) {
      errores.push('La contraseña debe contener al menos una letra, un número y un carácter especial');
    }


    if (errores.length > 0) {
      this.registerError = errores.join('. \n');
      return;
    }

    // Si todo ok, llama al servicio
    const nuevoUsuario = {
      nombre: this.nombreCompleto,
      correo: this.correo,
      password: this.nuevaContrasena,
      rol: 'cliente'
    };

    this.authService.registrarUsuario(nuevoUsuario).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res);
        this.limpiarFormularioRegistro();
        this.showRegisterModal = false;
        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        this.registerError = 'Ocurrió un error al registrar. Intenta más tarde.';
      }
    });
  }


  // Limpiar formulario de registro
  limpiarFormularioRegistro(): void {
    this.nombreCompleto = '';
    this.correo = '';
    this.nuevoUsuario = '';
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.aceptarTerminos = false;
    this.registerError = '';
    this.showRegisterPassword = false;
  }

  // Cerrar modal al hacer clic en el overlay
  closeModalOnOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.showRegisterModal = false;
      this.limpiarFormularioRegistro();
    }
  }

  // Mostrar términos y condiciones
  mostrarTerminos(): void {
    alert('Aquí se mostrarían los términos y condiciones completos');
    // En una implementación real, podrías abrir otro modal o navegar a una página de términos
  }

  // Métodos para mostrar/ocultar contraseñas
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRegisterPasswordVisibility(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  // Método para ir al registro (si lo necesitas para otra funcionalidad)
  goToRegister(): void {
    this.router.navigate(['/registro']);
  }

  // Limpiar errores al escribir
  onInputChange(): void {
    if (this.error) {
      this.error = '';
    }
  }

  // Validación del formulario de login
  isFormValid(): boolean {
    return this.usuario.trim().length >= 3 &&
      this.contrasena.trim().length >= 4;
  }

  // Manejar Enter en el formulario
  onEnterPressed(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.isFormValid() && !this.isLoading) {
      this.login();
    }
  }

  // Getters para el formulario de login
  get isFormDisabled(): boolean {
    return !this.isFormValid() || this.isLoading;
  }

  get passwordFieldType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  get passwordToggleIcon(): string {
    return this.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  get loginButtonText(): string {
    return this.isLoading ? 'Verificando...' : 'Iniciar Sesión';
  }

  get loginButtonIcon(): string {
    return this.isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-arrow-right';
  }

  // Getters para el formulario de registro
  get registerPasswordFieldType(): string {
    return this.showRegisterPassword ? 'text' : 'password';
  }

  get registerPasswordToggleIcon(): string {
    return this.showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
  }
}