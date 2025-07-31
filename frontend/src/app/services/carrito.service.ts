// src/app/services/carrito.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asiento {
  id: number;
  concierto_id: number;
  zona: string;     // usando "zona" en lugar de "seccion" por compatibilidad con tu frontend
  fila: string;
  numero: number;
  precio: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiBaseUrl = 'http://localhost:8000/api'; // Ajusta si es necesario

  constructor(private http: HttpClient) {}

  agregarAsiento(asiento: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/carrito/agregar`, asiento, { withCredentials: true });
  }

  obtenerCarrito(): Observable<{ asientos: any[] }> {
    return this.http.get<{ asientos: any[] }>(`${this.apiBaseUrl}/carrito`, { withCredentials: true });
  }

  eliminarAsiento(asientoId: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/carrito/asiento/${asientoId}`, { withCredentials: true });
  }

  confirmarCompra(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/carrito/confirmar`, {}, { withCredentials: true });
  }
}