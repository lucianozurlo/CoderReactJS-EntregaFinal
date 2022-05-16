# React JS
##### Entrega Final
---

## 1. Introducción
La aplicación tiene como finalizadad permitir al usuario generar una orden de compra de los productos cargados. 
En este caso, está pensado como un e-commerce de álbumes de canciones.

## 2. Inicializar el proyecto
Terminal:

```shell
// Clonar el repositorio localmente por HTTPS
% git clone https://github.com/lucianozurlo/CoderReactJS-EntregaFinal.git
```
```shell
// Generar package.json
% npm init
```
```shell
// Especificar referencias
 - package name
 - version
 - description
 - entry point
 - test command
 - git repository
 - keywords
 - author
 - license
```
```shell
// Instalar dependencias npm en el mismo directorio donde está el proyecto
% npm install
```

## 3. Cargar los productos en Firebase
La aplicación está preparada para consumir datos desde Firestore aunque podría utilizarse cualquier otro motor de base de datos.
La estructura en Firestore consta de colecciones > documentos > campos. En este caso, se organiza de la siguiente forma:

### Se deberán cargar los datos:

#### Colecciones:
`categories`: Pueden utilizarse cualquier tipo categoría. Ej: estilos musicales (grunge, punk, trash, etc.)
`products`: En esta colección se van a cargar los productos a vender.

#### Documentos de categories:
Deben tener un ID único, ej. "punk" y estar conformados por el campo "description" de la siguiente forma:
- Campo: nombre del campo. Ej. "description"
- Tipo de valor. Ej. "string"
- Valor: Valor que se usará para filtrar cada categoría. Ej. "Punk"

#### Documentos de products:
Deben tener un ID único (generado automáticamente o no), ej. "punk00001" y estar conformados por los campos:

`band`: Nombre de la banda
- Tipo de valor: string
- Valor: Ej. "Nirvana"

`album`: Nombre del álbum
- Tipo de valor: string
- Valor: Ej. "In Utero"

`description`: Año de lanzamiento del álbum
- Tipo de valor: number o string
- Valor: Ej. "1993"

`category`: Estilo musical. Para que filtre desde el Navbar, debe coincidir con alguna de las categorías cargadas en la colección categories.
- Tipo de valor: string
- Valor: Ej. "grunge"

`cover`: URL pública donde está alojada la portada del disco. Puede ser en formato jpg, png o gif, tamaño 400px x 400px.
- Tipo de valor: string
- Valor: Ej. "https://hosting/covers/in-utero.jpg"

_En la carpeta testing/covers dejo las portadas para descargarlas y añadirlas en la base de datos_

`price`: Valor montetario del producto
- Tipo de valor: number
- Valor: Ej. "1200"

`stock`: Cantidad de unidades disponibles del producto
- Tipo de valor: number
- Valor: Ej. "15"


Una vez generadas las órdenes de compra desde la aplicación, se van generando en forma automática las colecciones:

`orders`: Ordenes generadas

`users`: Usuarios que cargaron las órdenes

En ambos casos, los documentos que se dan de alta se cargan con un ID generado automaticamente por Firestore.
Los subcolecciones generados en estas colecciones se organizan de la siguiente manera:

`orders`:
- _ID generado automaticamente_
	- buyer
		- name: Nombre
		- phone: Teléfono
		- email: E-mail
		- date: Fecha de generación de orden de compra
	- items
		- número de orden del item (inicia en 0)
			- id: ID del producto
			- band: Banda
			- album: Álbum
			- price: Precio
			- quantity (cantidad de productos solictados)
			_A medida que se van sumando items, se añaden a continuación de cada uno._

`users`:
- name: Nombre
- phone: Teléfono
- email: E-mail
- date: Fecha de generación de orden de compra

## 4. Inicializar el proyecto
```shell
// Inicializar usando npm
% npm start
```

## 5. Navegación

La interface está formada por un header y el cuerpo. 

En el header se ubican en el centro un filtro para navegar por las distintas categorías cargadas, a la izquierda el logo de la aplicación que vuelve atrás el filtro de las categorías y a la derecha el contador del carrito de compras. Si se hace click ahí se puede visualizar su estado.

En el cuerpo, aparecen los resultados de la consulta de los productos cargados. Ahí mismo figuran también los resultados de las categorías.
Si se hace click en Ver Detalles, se accede a cada producto donde, además de su información están las opciones para generar la orden de compra: cantidad de items deseados y confirmación para agregarlos al carrito. Una vez sumados los productos, se habilitará en la parte inferior el botón para acceder al carrito.

En el caso de querer seguir navegando la aplicación, se mantiene la cantidad de items en el carrito.

### Proceso de compra

En el carrito, para modificar la cantidad de items de un producto, se accede al detalle y se modifica la cantidad desde los botones de cantidad.
Para elimiar un item del carrito se elimina desde el botón (X) de su registro y para vaciar el carrito completo, se hace desde el botón del pié del registro.

En esta instancia figura el resumen de la orden de compra con el total del costo y aparecen los campos para completar con los datos del usuario.
Una vez completados, para confirmar la compra y generar la orden, se deberá presionar el botón "Generar orden de compra".
Si no hay inconvenientes, se devolverá un mensaje de éxito.

![navegacion](https://firebasestorage.googleapis.com/v0/b/coder-aaff6.appspot.com/o/covers%2Fnavegacion.gif?alt=media&token=6ca40048-714b-4515-8c59-00c3d3c63885)

## 6. Componentes utilizados

Se desarrollaron componentes con distintas funciones:

- NavBar: Barra de menú simple donde, además del CartWidget, se ubican los filtros de categorías de productos.
- CartWidget: Ícono del carrito ubicado en el NavBar con un contador de productos añadidos
- ItemListContainer: Contenedor del componente ItemList donde se ubican todos los productos según la categoría activa. En el caso de no haber ninguna activa, se visualizan todos los productos
- ItemList: Agrupador de todos los componentes Item.js
- Item: Muestra información breve del producto
- ItemDetailContainer: Al solicitar los detalles del producto, se desmonta ItemListContainer y se monta este componente con la misma premisa pero que en este caso contenerá al componente ItemDetail
- ItemDetail: Muestra información detallada del producto además de contener el componente Counter.
- Counter: Contador de productos que suma o resta desde el detalle del producto. También muestra el total en el CartWidget del NavBar
- Cart: Cuando se accede a Cart, se desmonta ItemListContainer e ItemDetail y se monta conteniendo, además del formulario para generar la orden de compra, contiene el componente CartItem.
- CartItem: Cada item agregado en el carrito con la cantidad elegida.
