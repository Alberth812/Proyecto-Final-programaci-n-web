import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface UsuarioAPI {
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  private usuarioSubject = new BehaviorSubject<UsuarioAPI | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuarioDesdeStorage();
  }

  // Obtener todos los usuarios desde API
  getUsuarios(): Observable<UsuarioAPI[]> {
    return this.http.get<UsuarioAPI[]>(`${this.baseUrl}/usuarios`);
  }

  // Registrar nuevo usuario en API
  registrarUsuario(usuario: UsuarioAPI): Observable<UsuarioAPI> {
    return this.http.post<UsuarioAPI>(`${this.baseUrl}/registro`, usuario);
  }

  // Iniciar sesión
  login(correo: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { correo, password });
  }

  // Guardar usuario en BehaviorSubject y en localStorage
  guardarUsuario(usuario: UsuarioAPI): void {
    this.usuarioSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  // Obtener el usuario actual (desde BehaviorSubject)
  obtenerUsuario(): UsuarioAPI | null {
    return this.usuarioSubject.value;
  }

  // Obtener usuario directamente desde localStorage (opcional)
  obtenerUsuarioDesdeStorage(): UsuarioAPI | null {
    const usuarioString = localStorage.getItem('usuario');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }

  // Verificar si el usuario tiene rol admin
  esAdmin(): boolean {
    return this.obtenerUsuario()?.rol === 'admin';
  }

  // Cargar usuario desde localStorage cuando inicia la app
  private cargarUsuarioDesdeStorage(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario: UsuarioAPI = JSON.parse(usuarioString);
      this.usuarioSubject.next(usuario);
    }
  }

  // Cerrar sesión y limpiar datos
  logout(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }
}
