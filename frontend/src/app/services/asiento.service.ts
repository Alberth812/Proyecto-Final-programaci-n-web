import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asiento {
  id: number;
  concierto_id: number;
  seccion: string;
  fila: string;
  numero: number;
  precio: number;
  estado: 'libre' | 'carrito' | 'vendido';
}

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  private apiUrl = 'http://127.0.0.1:8000/api/asientos/concierto'; // Cambié esta línea

  constructor(private http: HttpClient) {}

  getAsientos(conciertoId: number): Observable<{ success: boolean, data: Asiento[] }> {
    return this.http.get<{ success: boolean, data: Asiento[] }>(`${this.apiUrl}/${conciertoId}`);
  }

  comprarAsientos(conciertoId: number, asientos: { asiento_id: number; zona: string; precio: number }[]): Observable<any> {
    const payload = {
      concierto_id: conciertoId,
      asientos: asientos
    };
    return this.http.post<any>(`${this.apiUrl}/comprar`, payload);
  }
}
