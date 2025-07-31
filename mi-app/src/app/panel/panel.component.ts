import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConciertoService, Concierto } from '../services/concierto.service';

interface CarouselImage {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  category: string;
}

interface EventDisplay {
  id?: number;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  time: string;
  artista: string;
  boletos_disponibles: number;
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  activeMenuItem: string = 'eventos';
  currentSlide: number = 0;
  selectedCategory: string = 'Todos';
  sortBy: string = 'date';
  isLoading: boolean = true;

  isProfileMenuOpen: boolean = false;
  cartItemCount: number = 0;

  events: EventDisplay[] = [];
  filteredEvents: EventDisplay[] = [];

  constructor(
    private router: Router,
    private conciertoService: ConciertoService
  ) {}

  carouselImages: CarouselImage[] = [
    {
      image: 'https://1.bp.blogspot.com/-IxJnbB3heJc/Wh8-4ZsyY3I/AAAAAAAAfjw/qJVKp8iCa3MSCTYkxRXEl-18zim4tJ8WwCLcBGAs/s1600/ciudad_del_rock_-_grilla_completa_h.jpg',
      title: 'Concierto de Rock',
      subtitle: 'Una noche épica con las mejores bandas',
      link: '',
      category: 'Conciertos'
    },
    {
      image: 'https://eventsdc.com/sites/default/files/2021-06/124851257_10157730968881616_4024292243868082916_n.png',
      title: 'Teatro Clásico',
      subtitle: 'Las mejores obras en escena',
      link: '',
      category: 'Teatro'
    },
    {
      image: 'https://www.obrascortas.com/wp-content/uploads/obras-teatro-clasicas.jpg',
      title: 'Festival de Jazz',
      subtitle: 'Música en vivo bajo las estrellas',
      link: '',
      category: 'Culturales'
    }
  ];

  categories: string[] = ['Todos', 'Conciertos', 'Teatro', 'comedia', 'Culturales'];

  ngOnInit(): void {
    this.startCarousel();
    this.loadConciertos();
    this.cartItemCount = 3;
  }

  loadConciertos(): void {
    this.isLoading = true;
    this.conciertoService.getConciertos().subscribe({
      next: (data: Concierto[]) => {
        this.events = data.map((concierto: Concierto) => ({
          id: concierto.id,
          title: concierto.titulo,
          date: concierto.fecha_evento,
          location: concierto.lugar,
          price: Number(concierto.precio_boleto),
          image: concierto.imagen || 'assets/images/default-concert.jpg',
          category: this.capitalize(concierto.categoria || this.determineCategory(concierto)),
          rating: concierto.rating ?? 4.5,
          description: concierto.descripcion ?? 'No hay descripción disponible',
          time: concierto.hora ?? '20:00',
          artista: concierto.artista,
          boletos_disponibles: concierto.boletos_disponibles,
          created_at: concierto.created_at,
          updated_at: concierto.updated_at,
        }));
        this.filteredEvents = [...this.events];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  capitalize(str: string): string {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  }

  determineCategory(concierto: Concierto): string {
    const lower = concierto.titulo.toLowerCase();
    if (lower.includes('teatro')) return 'Teatro';
    if (lower.includes('deporte')) return 'Deportes';
    return 'Conciertos';
  }

  setActiveMenu(menu: string) {
    this.activeMenuItem = menu;

    let elementId = '';
    switch (menu) {
      case 'eventos':
        elementId = 'seccion-eventos';
        break;
      case 'galeria':
        elementId = 'seccion-galeria';
        break;
      case 'contactos':
        elementId = 'seccion-contactos';
        break;
    }

    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  startCarousel(): void {
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.carouselImages.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredEvents = category === 'Todos'
      ? [...this.events]
      : this.events.filter(event => event.category === category);
  }

  onSortChange(event: any): void {
    const sortValue = event.target.value;
    this.sortBy = sortValue;

    switch (sortValue) {
      case 'date':
        this.filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'price':
        this.filteredEvents.sort((a, b) => a.price - b.price);
        break;
      case 'popularity':
        this.filteredEvents.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  irASeleccionAsientos(event: EventDisplay): void {
    this.router.navigate(['/compra'], {
      queryParams: {
        id: event.id,
        titulo: event.title,
        fecha: event.date,
        hora: event.time,
        lugar: event.location,
        precio: event.price
      }
    });
  }

  renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    const emptyStars = 5 - Math.ceil(rating);
    return stars + '☆'.repeat(emptyStars);
  }

  refreshEvents(): void {
    this.loadConciertos();
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.isProfileMenuOpen && !target.closest('.profile-menu-container')) {
      this.isProfileMenuOpen = false;
    }
  }

  goToPurchases(): void {
    this.router.navigate(['/compras-realizadas']);
    this.isProfileMenuOpen = false;
  }

  goToCart(): void {
    this.router.navigate(['/carrito']);
    this.isProfileMenuOpen = false;
  }

  verPerfil(): void {
    this.router.navigate(['/perfil']);
    this.isProfileMenuOpen = false;
  }

  logout(): void {
    this.router.navigate(['/']);
    this.isProfileMenuOpen = false;
  }

  verCompras(): void {
    this.router.navigate(['/compras']);
    this.isProfileMenuOpen = false;
  }

  zonas = [
    {
      nombre: 'Zona VIP',
      descripcion: 'Asientos exclusivos frente al escenario con servicio personalizado.',
      imagen: 'assets/images/vip-zone.jpg'
    },
    {
      nombre: 'Zona Preferente',
      descripcion: 'Excelente visibilidad y comodidad a un precio accesible.',
      imagen: 'assets/images/preferente-zone.jpg'
    },
    {
      nombre: 'Zona General',
      descripcion: 'Zona abierta para todos los asistentes con buena acústica.',
      imagen: 'assets/images/general-zone.jpg'
    }
  ];

  zonaActual: number = 0;

  zonaSiguiente() {
    this.zonaActual = (this.zonaActual + 1) % this.zonas.length;
  }

  zonaAnterior() {
    this.zonaActual = (this.zonaActual - 1 + this.zonas.length) % this.zonas.length;
  }

  irAZona(index: number) {
    this.zonaActual = index;
  }

  // 🚀 NUEVO: Acción del botón "Ver Detalles" del carrusel
  verDetalles(categoria: string): void {
    this.setActiveMenu('eventos');
    this.selectedCategory = categoria;
    this.filterByCategory(categoria);
  }
}