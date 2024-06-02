# OAuth2 authorization

OAuth 2.0 is the industry-standard protocol for authorization. OAuth2 - an authorization protocol that allows one service (application) to grant access rights to a user's resources on another service. **The protocol eliminates the need to trust the application with a login and password, and allows you to grant a limited set of rights rather than all at once.** The key difference from OAuth 1.0 is simplicity. In the new version, there are no immense signature schemes and the number of requests required for authorization has been reduced.
The result of authorization is an _access token_ in the query params - some kind of key (usually just a set of characters), the presentation of which is a pass to protected resources.

## Features

-   OAuth2 authentication with Google, Facebook, LinkedIn, and Apple
-   User registration and login
-   Access token generation and validation
-   Protected routes and resources

## Prerequisites

-   Node.js (version X.X.X or higher)
-   npm (version X.X.X or higher)
-   PostgreSQL (or any other supported database)

# Installation

### 1. Clone the repository:

```
git clone https://github.com/oleh-vorobets/passport-auth
```

### 2. Install the dependencies:

Open your terminal in project root, then write:

```
npm install
```

### 3. Set up the database:

-   Create a new database in PostgreSQL (or your preferred database)
-   Update the database connection settings in the .env file (see Configuration section)

### 4. Run project:

```
npm run start
```

# Configuration

1. Open .env file in directory root of the project
2. Set the following environment variables in the .env file, which is already created
