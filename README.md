<div align="center">

# Todo List API

API REST for task management application (to do list) built with node.js, express, prism and postgreg.

</div>

---

## Installation and configuration

### Prerequisites

- Node.js (v16 o superior)
- PostgreSQL
- npm o yarn

### 1. Install dependencies

```bash
npm install
```

---

### 2. Configure environment variables

Copy the file [`.env.example`](.env.example) to `.env`and configure the variables:

```bash
cp .env.example .env
```

> Edit the file `.env`

---

### 3. Configure database

```bash
# Generate prism client
npm run db:generate

# Execute migrations
npm run db:migrate

# Populate database with test data (optional)
npm run db:seed
```

<details>

<summary>Click to see more</summary>

> A user with default credentials will be created in the file`.env` and it will be populated with All initials
>
> ```toml
> # Default User Config
>
> DEFAULT_USER_EMAIL="admin@example.com"
> DEFAULT_USER_PASSWORD="Password123"
> ```

</details>

---

### 4. Start server

```bash
# Development
npm run dev

# Production
npm start
```

---

## API Endpoints

- You can check the endpoints available in the file [api-examples.http](api-examples.http) For details.

  - > You can run them directly if you have the extension [**Rest Client**](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

- You can visit the postman collection in [Postman](https://www.postman.com/javier-prez/workspace/javi-cd/collection/43954198-7821f9f2-2ce1-4318-857f-51c2e690996f?action=share&source=copy-link&creator=43954198)

---

## Project structure

<details>

<summary>View the project structure</summary>

```yaml
to-do-list-api/
├── src/
│   ├── config/
│   │   └── database.js          # Prism configuration
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication controllersn
│   │   └── todo.controller.js   # Controllers of Todos
│   ├── database/
│   │   ├── mocks/               # Mock data for testing
│   │   │   ├── index.js         # Centralized Mocks Export
│   │   │   ├── todos.mock.js    # Everyone's mock data
│   │   │   └── users.mock.js    # User Mock data
│   │   └── seed.js              # BD seeding script
│   ├── middleware/
│   │   ├── auth.middleware.js   # Authentication Middleware
│   │   ├── errorHandler.js      # Error management
│   │   └── notFound.js          # Middleware 404
│   ├── routes/
│   │   ├── auth.routes.js       # Authentication routes
│   │   └── todo.routes.js       # Routes of Todos
│   ├── schemas/
│   │   ├── auth.schema.js       # Auth validations
│   │   └── todo.schema.js       # Validations of all
│   ├── utils/
│   │   ├── logger.js            # logger
│   │   └── README               # logger.js use explanation
│   ├── app.js                   # Express configuration
│   └── server.js                # Server entry point
├── prisma/
│   └── schema.prisma            # BD scheme
├── .env.example                 # Environment Variables Example
├── api-examples.http            # Examples of HTTP requests
├── package.json
└── README.md
```

</details>

---

## Next improvements

- [ ] unit and integration tests
- [ ] Documentation with Swagger/Openai
- [x] ~~structured logging~~ implemented
- [ ] metric and monitoring
- [ ] Cache with Redis
- [ ] Categories of all

---

## Security

If you have confront vulnerability or want to talk about a failure in the project visit the file [SECURITY.md](SECURITY.md) For details.

---

## Contribution

If you want to contribute to the Visit the Archive project [CONTRIBUTING.md](CONTRIBUTING.md) For details.

---

## Code Of Conducts

To know the project behavior codes, visit the file [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) For details.

---

## License

This project is under the MIT license -see the file [LICENCE](LICENSE) For details.
