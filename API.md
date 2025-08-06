# Recursos

## Products

URL: `/products`

### Lista de productos
`GET /products`

#### Filtros
- Categorías: `GET /products/?categoryId={category_id}`

#### Responses
- 200: exito
- 500: error de servidor
- 400: error en la petición

### Detalle de producto

`GET /products/{product_id}`

#### Responses:
- 200: éxito
- 404: no fue encontrado
- 500: error en el servidor

### Crear 

`POST /products`

#### Request
- Headers:
  - `Content-Type = application/json`
  - `Accept = application/json`
- Body:
```json
{
    "name": "T shirt",
    "price": 40,
    "categoryId": 1
}
```

#### Response
- 201: Created
- 400: Bad Request
- 500: Error en el servidor
  
```json
{
    "id": 1,
    "name": "T shirt",
    "price": 40,
    "categoryId": 1
}
```

### Edición
`PUT /products/{product_id}/`

#### Request
- Headers:
  - `Content-Type = application/json`
  - `Accept = application/json`

#### Response
- 200: éxito
- 400: Bad Request
- 500: Error en el servidor

### Edición Parcial
`PATCH /products/{product_id}/`

#### Request
- Headers:
  - `Content-Type = application/json`
  - `Accept = application/json`

#### Response
- 200: éxito
- 400: Bad Request
- 500: Error en el servidor

### Eliminación

`DELETE /products/{product_id}`

#### Response
- 204: Empty Response
- 404: Not found
- 500: Error en el servidor

## Categories

URL: `/categories`

## Users

URL: `/users`