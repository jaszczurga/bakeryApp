
## Keycloak

Keycloak is an open source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code.

## Setup

1. Run command `docker-compose up -d` to start the Keycloak server with a PostgreSQL database.
2. Open the Keycloak admin console at [http://localhost:8081](http://localhost:8081) and login with the default credentials `admin/admin`.
3. Create a new realm importing the file `realm-export.json` located in the `keycloak` directory.
4. In real settings set themes for login to keycloak-customized.
5. In realm settings go to Login turn on User registration and later go to user registration then assign user role but unassing others

### Bakery-app admin

1. Create a new user in the realm `bakery-app` with the username `admin` and password `admin`.
2. Assign the role `admin` to the user.

### Bakery-app user

1. Users are created automatically when users register in the Bakery-app.