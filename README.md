# **Tecnológico Nacional de México**

## **Instituto Tecnológico de Oaxaca**

### **Ingeniería en Sistemas Computacionales**

### **Proyecto Final: Sistema de Gestión de Eventos "TicketChiri"**

#### **Una aplicación web integral para la venta y gestión de boletos digitales**


###   **Presentado por:**

-   Fructuoso Hernández Juan Carlos.
-   Hernández Sosa Andres.







# TicketChiri – Sistema de Venta de Boletos para Eventos

### Descripción del Sistema
**TicketChiri** es un sistema web para la compra y gestión de boletos digitales para conciertos, espectáculos y eventos culturales. Permite a los usuarios navegar por eventos, seleccionar asientos interactivamente y realizar compras en tiempo real, mientras que los administradores pueden gestionar el catálogo de eventos desde un panel especializado.



##   Tipo de Sistema
**Sistema Web Full-Stack (Frontend en Angular, Backend en Laravel/PHP)**  
Aplicación SPA (Single Page Application) desarrollada con **Angular 20+** en el frontend, consumiendo una API RESTful desde un backend (no incluido en este repositorio, pero configurado para conectarse a `http://127.0.0.1:8000`).  



##   Características Principales

- **Autenticación de usuarios** con roles (cliente y administrador).
- **Panel de administración** para crear, editar y eliminar eventos (conciertos).
- **Selección interactiva de asientos** por zonas (VIP, Platino, Plata, General).
- **Filtros y ordenamiento** de eventos por categoría, fecha, precio y popularidad.
- **Carrito de compras** integrado con persistencia en sesión.
- **Registro e inicio de sesión** mediante formulario con validaciones.
- Diseño responsivo y moderno con animaciones y efectos visuales.



##   Estructura del Proyecto (Frontend - Angular)

```
src/
├── app/
│   ├── login/                  # Componente de autenticación
│   ├── panel/                  # Panel principal del usuario
│   ├── compra/                 # Selección de asientos y compra
│   ├── admin/                  # Panel de administración de eventos
│   ├── usuario/perfil/         # Gestión del perfil del usuario
│   ├── services/               # Servicios HTTP para comunicación con API
│   │   ├── auth.service.ts     # Autenticación y gestión de sesión
│   │   ├── concierto.service.ts# CRUD de conciertos
│   │   ├── carrito.service.ts  # Gestión del carrito
│   │   └── asiento.service.ts  # Gestión de asientos (placeholder)
│   ├── app.component.ts        # Componente raíz
│   ├── app.config.ts           # Configuración global (router + HTTP)
│   └── app.routes.ts           # Definición de rutas
├── assets/                     # Imágenes y recursos estáticos
├── environments/               # Configuraciones por entorno
├── index.html                  # Página principal
└── main.ts                     # Punto de entrada de la aplicación
```


##   Tecnologías y Métodos Utilizados

### Frontend (Angular)
- **Angular 20+** (Standalone Components, Signals, Reactive Forms)
- **TypeScript** como lenguaje principal
- **HttpClientModule** para peticiones HTTP a la API REST
- **Router** para navegación entre vistas
- **NgModel** para data binding en formularios
- **LocalStorage** para persistencia de sesión y usuario logueado
- **CSS3 + Flexbox/Grid** para diseño responsivo
- **FontAwesome** para íconos

### Backend (API)
- **Laravel (PHP)** en `http://127.0.0.1:8000`
- Endpoints utilizados:
  - `GET /api/conciertos` → Listar eventos
  - `POST /api/conciertos` → Crear evento (admin)
  - `PUT /api/conciertos/{id}` → Actualizar evento
  - `DELETE /api/conciertos/{id}` → Eliminar evento
  - `GET /api/usuarios` → Listar usuarios
  - `POST /api/usuarios` → Registrar nuevo usuario


## Servicios Implementados

| Servicio | Funcionalidad |
|--------|---------------|
| `AuthService` | Manejo de login, registro, rol de usuario (cliente/admin), y estado de sesión mediante `BehaviorSubject` y `localStorage` |
| `ConciertoService` | CRUD de eventos: carga, creación, edición y eliminación de conciertos |
| `CarritoService` | Gestión de asientos seleccionados (agregar, eliminar, confirmar compra) |
| `AsientoService` | (Placeholder) Futura gestión detallada de asientos por evento |



## Autenticación y Roles
- **Usuarios**: autenticación mediante correo y contraseña.
- **Roles soportados**:
  - `cliente`: Acceso al panel de eventos y compra de boletos.
  - `admin`: Acceso al panel de administración (`/admin`) para gestionar conciertos.
- La autenticación es simulada mediante consulta a la API y almacenamiento en `localStorage`.



## Pruebas Unitarias
- Componentes y servicios cuentan con pruebas básicas usando **Jasmine + Karma**.
- Archivos `.spec.ts` disponibles para cada componente y servicio principal.



## Cómo Ejecutar el Proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Alberth812/Proyecto-Final-programaci-n-web.git
   cd Proyecto-Final-programaci-n-web
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Asegurarse de que el backend esté corriendo en `http://127.0.0.1:8000`

4. Iniciar la aplicación:
   ```bash
   ng serve
   ```

5. Acceder desde el navegador:
   ```
   http://localhost:4200
   ```

#  Backend  
## (Laravel 12 + MySQL)



##   Backend

El backend del proyecto  gestiona la lógica de negocio, autenticación, base de datos y procesos críticos del sistema. Está diseñado para interactuar con un frontend en Angular, proporcionando servicios para la gestión de usuarios, eventos, asientos, carritos y compras.

Este sistema permite:
- Autenticación segura basada en sesión.
- Gestión completa de eventos culturales (conciertos).
- Reserva y compra de asientos en tiempo real.
- Generación de boletos digitales y envío por correo.
- Control de acceso por roles (admin, cliente).

##   Proceso de Logueo

El sistema implementa un flujo de autenticación basado en **sesiones y validación de credenciales contra la base de datos**:

1. El frontend envía correo y contraseña al endpoint `GET /api/usuarios`.
2. Laravel devuelve todos los usuarios registrados (en este caso, por simplicidad, se filtra en frontend).
3. Se compara el correo y la contraseña (hasheada con `bcrypt`) en el backend.
4. Si coinciden:
   - Se inicia una sesión.
   - Se almacena el usuario en `localStorage` desde el frontend.
5. El rol (`admin` o `cliente`) determina la redirección post-login.

>   **Nota:** Aunque la validación actual se realiza en frontend, el backend garantiza que solo usuarios registrados puedan realizar acciones sensibles (CRUD, compras, etc.).


##   Niveles de Usuario | Rol

El sistema define **tres roles** en la base de datos, aunque actualmente se utilizan dos:

| Rol | Permisos |
|-----|--------|
| **admin** | - CRUD de conciertos<br>- Gestión de usuarios<br>- Acceso total al sistema |
| **cliente** | - Explorar eventos<br>- Comprar boletos<br>- Gestionar perfil |

### Base de datos (Migración)
```php
// En la tabla 'usuarios'
$table->enum('rol', ['admin', 'vendedor', 'cliente'])->default('cliente');
```

##   CRUD de Usuarios

Implementado mediante **Laravel Eloquent** con validaciones y encriptación segura.

###   Modelo: `Usuario.php`
```php
class Usuario extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'correo', 'password', 'rol'];
    protected $hidden = ['password', 'remember_token'];
}
```

###   Controlador: `UsuarioController.php`
- `GET /api/usuarios` → Listar todos los usuarios (usado para login)
- `POST /api/usuarios` → Registrar nuevo usuario (contraseña encriptada con `bcrypt`)
- `PUT /api/usuarios/{id}` → Actualizar datos (futuro)
- `DELETE /api/usuarios/{id}` → Eliminar usuario (solo admin)

###   Encriptación de Contraseñas
```php
// En el controlador
$usuario->password = bcrypt($request->password);
```

###  Migración y Seeder
- **Migración:** `create_usuarios_table` con correo único.
- **Seeder:** `UsuarioSeeder` con datos de prueba (admin y clientes).


##   CRUD de Productos (Conciertos/Eventos)

Los "productos" son eventos culturales como conciertos, obras de teatro, etc.

###   Modelo: `Concierto.php`
```php
class Concierto extends Model
{
    use HasFactory;
    protected $fillable = [
        'titulo', 'artista', 'fecha_evento', 'hora', 'lugar',
        'precio_boleto', 'boletos_disponibles', 'imagen',
        'descripcion', 'categoria', 'rating'
    ];
}
```

###   Controlador: `ConciertoController.php`
- `GET /api/conciertos` → Listar eventos (con paginación)
- `POST /api/conciertos` → Crear evento (solo admin)
- `PUT /api/conciertos/{id}` → Editar evento
- `DELETE /api/conciertos/{id}` → Eliminar evento

###   Migración
```php
Schema::create('conciertos', function (Blueprint $table) {
    $table->id();
    $table->string('titulo');
    $table->string('artista');
    $table->date('fecha_evento');
    $table->string('hora');
    $table->string('lugar');
    $table->decimal('precio_boleto', 8, 2);
    $table->integer('boletos_disponibles');
    $table->string('imagen')->nullable();
    $table->text('descripcion')->nullable();
    $table->string('categoria')->nullable();
    $table->float('rating', 2, 1)->default(4.5);
    $table->timestamps();
});
```


## Proceso Principal: Venta de Boletos


### 1. **Reserva de Asientos**
- El usuario selecciona asientos en el frontend.
- El backend verifica que el asiento esté `disponible`.
- Al agregar al carrito, el estado cambia a `ocupado`.

### 2. **Carrito de Compras**
- Cada usuario tiene un carrito asociado (`Carrito`).
- Los asientos se almacenan en una tabla intermedia `asiento_carrito`.

### 3. **Confirmación de Compra**
Controlador: `CompraController.php`

```php
public function confirmarCompra()
{
    return DB::transaction(function () use ($user) {
        $carrito = Carrito::where('usuario_id', $user->id)->first();
        $asientos = $carrito->asientosCarrito()->with('asiento')->get();

        foreach ($asientos as $item) {
            $asiento = $item->asiento;
            if ($asiento->estado !== 'ocupado') {
                return response()->json(['error' => 'Asiento no reservado'], 400);
            }

            $asiento->estado = 'vendido';
            $asiento->save();

            Boleto::create([
                'comprador_id' => $user->id,
                'asiento_id' => $asiento->id,
            ]);
        }

        $carrito->asientosCarrito()->delete();

        return response()->json(['mensaje' => 'Compra confirmada']);
    });
}
```

##   Otras Funcionalidades Únicas del Backend

### 1. **Gestión de Asientos por Zona**
- Modelo `Asiento` con campos: `seccion`, `fila`, `numero`, `precio`, `estado`.
- Estados: `disponible`, `ocupado`, `vendido`.
- Relación con `concierto_id` para eventos específicos.

### 2. **Carrito con Transacciones Seguras**
- Uso de `DB::transaction()` para garantizar consistencia.
- Bloqueo de asientos con `lockForUpdate()` para evitar duplicados.

### 3. **Validaciones en Tiempo Real**
- Validación de campos en formularios (correo, contraseñas, precios).
- Respuestas JSON con mensajes de error detallados.

### 4. **Filtros y Búsqueda de Eventos**
- Endpoint `GET /api/conciertos` soporta filtros por:
  - Categoría
  - Fecha
  - Precio
  - Popularidad (rating)

### 5. **Seeders para Datos de Prueba**
- `ConciertoSeeder` con eventos reales:
  - Rock Alternativo
  - Música Electrónica
  - Salsa en Vivo
- `UsuarioSeeder` con cuenta de admin y clientes.


##   Estructura del Backend (Laravel)

```
app/
├── Http/
│   └── Controllers/
│       └── Api/
│           ├── UsuarioController.php
│           ├── ConciertoController.php
│           ├── AsientoController.php
│           ├── CarritoController.php
│           ├── CompraController.php
│           └── BoletoController.php
├── Models/
│   ├── Usuario.php
│   ├── Concierto.php
│   ├── Asiento.php
│   ├── Carrito.php
│   ├── AsientoCarrito.php
│   ├── Boleto.php
│   └── Venta.php
database/
├── migrations/
│   ├── create_usuarios_table.php
│   ├── create_conciertos_table.php
│   ├── create_asientos_table.php
│   ├── create_carritos_table.php
│   ├── create_asiento_carrito_table.php
│   ├── create_boletos_table.php
│   └── create_ventas_table.php
├── seeders/
│   ├── UsuarioSeeder.php
│   ├── ConciertoSeeder.php
│   └── DatabaseSeeder.php
resources/
└── views/
    └── boletos/
        └── ticket.blade.php 
```


##   Cómo Ejecutar el Backend

```bash
cd backend-ticketchiri
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

> Servidor disponible en: `http://127.0.0.1:8000`


##   Pruebas y Calidad
- **Transacciones SQL** para operaciones críticas (compras).
- **Validaciones** en todos los endpoints.
- **Seeders** para datos consistentes.
- **Manejo de errores** con códigos HTTP adecuados (404, 400, 500).


## Licencia
Este proyecto es de código abierto para fines educativos.

## Capturas de proyecto

<img width="1841" height="922" alt="image" src="https://github.com/user-attachments/assets/5c03d9ff-3ad8-4867-bfc1-37a11a85540a" />

<img width="1842" height="918" alt="image" src="https://github.com/user-attachments/assets/b6290ee9-f774-4516-8027-00aa175145d3" />

<img width="1847" height="925" alt="image" src="https://github.com/user-attachments/assets/46815d6e-c051-4f22-af65-50f23624aee6" />

<img width="1833" height="915" alt="image" src="https://github.com/user-attachments/assets/9921873c-e50e-49e7-980b-fa1a5f35f550" />

<img width="1853" height="814" alt="image" src="https://github.com/user-attachments/assets/3950cf8b-2a9a-46ac-ae26-aab71e3d3a7a" />


