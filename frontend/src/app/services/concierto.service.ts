// src/app/services/concierto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// src/app/services/concierto.service.ts (o donde tengas definida la interfaz)
export interface Concierto {
  id?: number;
  titulo: string;
  artista: string;
  fecha_evento: string;
  hora: string;
  lugar: string;
  precio_boleto: number | string;
  boletos_disponibles: number;
  imagen: string;
  descripcion: string;
  created_at?: string;
  updated_at?: string;
  categoria: string;
  rating: number;

  // Aquí agrega estas propiedades que faltan:
  boletos_vip: number;
  boletos_platino: number;
  boletos_plata: number;
  boletos_oro: number;
  boletos_general: number;
}


@Injectable({
  providedIn: 'root'
})
export class ConciertoService {
  private apiUrl = 'http://127.0.0.1:8000/api/conciertos';

  constructor(private http: HttpClient) {}

  getConciertos(): Observable<Concierto[]> {
    return this.http.get<{ success: boolean; data: Concierto[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getConcierto(id: number): Observable<Concierto> {
    return this.http.get<Concierto>(`${this.apiUrl}/${id}`);
  }

  crearConcierto(concierto: Concierto): Observable<Concierto> {
    return this.http.post<Concierto>(this.apiUrl, concierto);
  }

  actualizarConcierto(id: number, concierto: Concierto): Observable<Concierto> {
    return this.http.put<Concierto>(`${this.apiUrl}/${id}`, concierto);
  }

  eliminarConcierto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}