import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsientoService, Asiento } from '../services/asiento.service';
import { CompraService } from '../services/compra.service';
import { AuthService } from '../services/auth.service';  // importa AuthService



interface AsientoUI {
  id: number;
  ocupado: boolean;
}

interface Fila {
  asientos: AsientoUI[];
}

interface Zona {
  nombre: string;
  descripcion: string;
  color: string;
  precio: number;
  tipo: string;
  filas: Fila[];
}

interface AsientoSeleccionado {
  zona: string;
  asientoId: number;
}

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  conciertoSeleccionado: any = null;

  zonas: Zona[] = [
    {
      nombre: 'VIP',
      descripcion: 'Asientos exclusivos frente al escenario.',
      color: '#e74c3c',
      precio: 2500,
      tipo: 'VIP',
      filas: []
    },
    {
      nombre: 'Platino',
      descripcion: 'Zona preferente con buena vista.',
      color: '#f1c40f',
      precio: 1800,
      tipo: 'Platino',
      filas: []
    },
    {
      nombre: 'Oro',
      descripcion: 'Buena vista al centro.',
      color: '#ffa500',
      precio: 1600,
      tipo: 'Oro',
      filas: []
    },
    {
      nombre: 'Plata',
      descripcion: 'Zona intermedia.',
      color: '#95a5a6',
      precio: 1300,
      tipo: 'Plata',
      filas: []
    },
    {
      nombre: 'General',
      descripcion: 'Zona general abierta.',
      color: '#2ecc71',
      precio: 850,
      tipo: 'General',
      filas: []
    }
  ];

  asientosSeleccionados: AsientoSeleccionado[] = [];

  cantidadesPorZona: { [key: string]: number } = {
    VIP: 100,
    Platino: 150,
    Oro: 100,
    Plata: 150,
    General: 250
  };

 constructor(
    private authService: AuthService ,
  private route: ActivatedRoute,
  private router: Router,
  private asientoService: AsientoService,
  private compraService: CompraService    // <-- aquí

) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.conciertoSeleccionado = {
        id: +params['id'] || 0,
        titulo: params['titulo'] || 'Evento demo',
        artista: params['artista'] || 'Artista demo',
        fecha_evento: params['fecha'] || '2025-01-01',
        hora: params['hora'] || '20:00',
        lugar: params['lugar'] || 'Lugar demo',
        precio_boleto: +params['precio'] || 1000,
        boletos_disponibles: +params['boletos_disponibles'] || 100,
        imagen: params['imagen'] || null
      };

      this.cargarAsientosReales();
    });
  }

  cargarAsientosReales() {
    this.asientoService.getAsientos(this.conciertoSeleccionado.id).subscribe({
      next: (resp) => {
        if (resp.success) {
          this.mapearAsientosAZonas(resp.data);
        }
      },
      error: (err) => {
        console.error('Error cargando asientos', err);
        this.generarEstadioFallback(); // fallback si la API falla
      }
    });
  }

  mapearAsientosAZonas(asientos: Asiento[]) {
    const maxAsientosPorFila = 10;

    this.zonas.forEach(zona => {
      zona.filas = [];
      const asientosZona = asientos.filter(a => a.seccion.toLowerCase() === zona.nombre.toLowerCase());
      const cantidadZona = asientosZona.length;
      const filas = Math.ceil(cantidadZona / maxAsientosPorFila);

      for (let i = 0; i < filas; i++) {
        const fila: Fila = { asientos: [] };
        for (let j = 0; j < maxAsientosPorFila; j++) {
          const index = i * maxAsientosPorFila + j;
          if (index >= cantidadZona) break;
          const asiento = asientosZona[index];
          fila.asientos.push({
            id: asiento.id,
            ocupado: asiento.estado !== 'libre'
          });
        }
        zona.filas.push(fila);
      }
    });
  }

  generarEstadioFallback() {
    const maxAsientosPorFila = 10;

    this.zonas.forEach(zona => {
      zona.filas = [];
      const cantidadZona = this.cantidadesPorZona[zona.nombre] || 0;
      const filas = Math.ceil(cantidadZona / maxAsientosPorFila);

      for (let i = 0; i < filas; i++) {
        const fila: Fila = { asientos: [] };
        for (let j = 0; j < maxAsientosPorFila; j++) {
          const asientoIndex = i * maxAsientosPorFila + j;
          if (asientoIndex >= cantidadZona) break;
          fila.asientos.push({
            id: asientoIndex + 1,
            ocupado: false
          });
        }
        zona.filas.push(fila);
      }
    });
  }

  toggleSeleccionAsiento(zonaNombre: string, asientoId: number) {
    const index = this.asientosSeleccionados.findIndex(
      s => s.zona === zonaNombre && s.asientoId === asientoId
    );
    if (index >= 0) {
      this.asientosSeleccionados.splice(index, 1);
    } else {
      this.asientosSeleccionados.push({ zona: zonaNombre, asientoId });
    }
  }

  estaSeleccionado(zonaNombre: string, asientoId: number): boolean {
    return this.asientosSeleccionados.some(
      s => s.zona === zonaNombre && s.asientoId === asientoId
    );
  }

  get totalSeleccionados(): number {
    return this.asientosSeleccionados.reduce((total, sel) => {
      const zona = this.zonas.find(z => z.nombre === sel.zona);
      return total + (zona?.precio || 0);
    }, 0);
  }

   comprar() {
    if (this.asientosSeleccionados.length === 0) {
      alert('No has seleccionado ningún asiento.');
      return;
    }

    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      alert('Debes iniciar sesión para comprar.');
      this.router.navigate(['/login']);
      return;
    }

    const asientosParaComprar = this.asientosSeleccionados.map(sel => {
      const zona = this.zonas.find(z => z.nombre === sel.zona);
      return {
        id: sel.asientoId,
        precio: zona?.precio || 0
      };
    });

    const compraPayload = {
      usuario_id: usuario.id,  // aquí tomas el id dinámico
      concierto_id: this.conciertoSeleccionado.id,
      asientos: asientosParaComprar
    };

    this.compraService.realizarCompra(compraPayload).subscribe({
      next: (resp) => {
        if (resp.success) {
          alert('Compra realizada con éxito.');
          this.router.navigate(['/mis-compras']);  // o la ruta que uses
        } else {
          alert('Error en la compra: ' + resp.message);
        }
      },
      error: (err) => {
        console.error('Error en la compra', err);
        alert('Error al procesar la compra.');
      }
    });
  }
}