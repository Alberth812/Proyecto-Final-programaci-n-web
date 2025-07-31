import { Component, OnInit } from '@angular/core';
import { ConciertoService, Concierto } from '../services/concierto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminPanelComponent implements OnInit {
  conciertos: Concierto[] = [];
  searchTerm: string = '';
  categoriaSeleccionada: string = '';
  modalAbierto = false;
  modoEdicion = false;
  conciertoEditando: Concierto = this.inicializarConcierto();

  mensaje: string = '';
  tipoMensaje: 'exito' | 'error' | '' = '';

  categorias: string[] = ['Todos', 'Conciertos', 'Teatro', 'Comedia', 'Culturales'];

  // Configuración de boletos por defecto
  private static readonly BOLETOS_POR_DEFECTO = {
    total: 750,
    vip: 100,
    platino: 150,
    plata: 150,
    oro: 100,
    general: 250
  };

  constructor(private conciertoService: ConciertoService) {}

  ngOnInit() {
    this.cargarConciertos();
  }

  cargarConciertos() {
    this.conciertoService.getConciertos().subscribe({
      next: data => this.conciertos = data,
      error: () => this.mostrarMensaje('Error al cargar conciertos', 'error')
    });
  }

  abrirModal() {
    this.modoEdicion = false;
    this.conciertoEditando = this.inicializarConcierto();
    this.modalAbierto = true;
    this.limpiarMensaje();
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.limpiarMensaje();
  }

  editarConcierto(concierto: Concierto) {
    this.modoEdicion = true;
    this.conciertoEditando = { ...concierto };
    this.modalAbierto = true;
    this.limpiarMensaje();
  }

  guardarConcierto() {
    if (
      !this.conciertoEditando.titulo ||
      !this.conciertoEditando.artista ||
      !this.conciertoEditando.fecha_evento ||
      !this.conciertoEditando.hora ||
      !this.conciertoEditando.lugar ||
      !this.conciertoEditando.categoria
    ) {
      this.mostrarMensaje('Completa todos los campos obligatorios.', 'error');
      return;
    }

    // Convertir a números para evitar errores de tipo
    this.conciertoEditando.precio_boleto = Number(this.conciertoEditando.precio_boleto);
    this.conciertoEditando.rating = Number(this.conciertoEditando.rating);

    // Si no es modo edición, establecer valores por defecto para boletos
    if (!this.modoEdicion) {
      this.conciertoEditando.boletos_disponibles = AdminPanelComponent.BOLETOS_POR_DEFECTO.total;
      this.conciertoEditando.boletos_vip = AdminPanelComponent.BOLETOS_POR_DEFECTO.vip;
      this.conciertoEditando.boletos_platino = AdminPanelComponent.BOLETOS_POR_DEFECTO.platino;
      this.conciertoEditando.boletos_plata = AdminPanelComponent.BOLETOS_POR_DEFECTO.plata;
      this.conciertoEditando.boletos_oro = AdminPanelComponent.BOLETOS_POR_DEFECTO.oro;
      this.conciertoEditando.boletos_general = AdminPanelComponent.BOLETOS_POR_DEFECTO.general;
    } else {
      // En modo edición, convertir a números los valores actuales
      this.conciertoEditando.boletos_disponibles = Number(this.conciertoEditando.boletos_disponibles);
      this.conciertoEditando.boletos_vip = Number(this.conciertoEditando.boletos_vip);
      this.conciertoEditando.boletos_platino = Number(this.conciertoEditando.boletos_platino);
      this.conciertoEditando.boletos_plata = Number(this.conciertoEditando.boletos_plata);
      this.conciertoEditando.boletos_oro = Number(this.conciertoEditando.boletos_oro);
      this.conciertoEditando.boletos_general = Number(this.conciertoEditando.boletos_general);
    }

    if (this.modoEdicion && this.conciertoEditando.id) {
      this.conciertoService.actualizarConcierto(this.conciertoEditando.id, this.conciertoEditando).subscribe({
        next: () => {
          this.mostrarMensaje('Concierto actualizado con éxito', 'exito');
          this.cargarConciertos();
          this.cerrarModal();
        },
        error: () => this.mostrarMensaje('Error al actualizar concierto', 'error')
      });
    } else {
      this.conciertoService.crearConcierto(this.conciertoEditando).subscribe({
        next: () => {
          this.mostrarMensaje('Concierto creado correctamente', 'exito');
          this.cargarConciertos();
          this.cerrarModal();
        },
        error: () => this.mostrarMensaje('Error al crear concierto', 'error')
      });
    }
  }

  eliminarConcierto(id?: number) {
    if (!id) return;
    if (confirm('¿Seguro que quieres eliminar este concierto?')) {
      this.conciertoService.eliminarConcierto(id).subscribe({
        next: () => {
          this.mostrarMensaje('Concierto eliminado correctamente', 'exito');
          this.cargarConciertos();
        },
        error: () => this.mostrarMensaje('Error al eliminar concierto', 'error')
      });
    }
  }

  conciertosFiltrados(): Concierto[] {
    return this.conciertos.filter(c => {
      const term = this.searchTerm.toLowerCase();
      const matchesBusqueda =
        term === '' ||
        c.titulo.toLowerCase().includes(term) ||
        c.artista.toLowerCase().includes(term) ||
        c.lugar.toLowerCase().includes(term) ||
        (c.categoria?.toLowerCase().includes(term) ?? false);

      const matchesCategoria =
        !this.categoriaSeleccionada || this.categoriaSeleccionada === 'Todos' || c.categoria === this.categoriaSeleccionada;

      return matchesBusqueda && matchesCategoria;
    });
  }

  inicializarConcierto(): Concierto {
    return {
      id: 0,
      titulo: '',
      artista: '',
      fecha_evento: '',
      hora: '',
      lugar: '',
      precio_boleto: 0,
      boletos_disponibles: AdminPanelComponent.BOLETOS_POR_DEFECTO.total,
      imagen: '',
      descripcion: '',
      categoria: '',
      rating: 0,
      created_at: '',
      updated_at: '',
      boletos_vip: AdminPanelComponent.BOLETOS_POR_DEFECTO.vip,
      boletos_platino: AdminPanelComponent.BOLETOS_POR_DEFECTO.platino,
      boletos_plata: AdminPanelComponent.BOLETOS_POR_DEFECTO.plata,
      boletos_oro: AdminPanelComponent.BOLETOS_POR_DEFECTO.oro,
      boletos_general: AdminPanelComponent.BOLETOS_POR_DEFECTO.general
    };
  }

  salir() {
    window.location.href = '/'; // Cambia la ruta si usas otra para login
  }

  mostrarMensaje(msg: string, tipo: 'exito' | 'error') {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.limpiarMensaje(), 4000);
  }

  limpiarMensaje() {
    this.mensaje = '';
    this.tipoMensaje = '';
  }
}