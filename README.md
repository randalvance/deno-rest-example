# Deno REST API Example

This is a simple example on how to create a REST API using Deno.

To run the example, type:
```
deno run --allow-net  server.ts
```

Access the endpoints:
```
GET http://localhost:8000/api/products
GET http://localhost:8000/api/products/:id
POST http://localhost:8000/api/products
DELETE http://localhost:8000/api/products/:id
UPDATE http://localhost:8000/api/products/:id
```