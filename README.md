# Dynamic Mock Server

Where we don't need to worry about the APIs world anymore. Every api must work smoothly.

## How it works

Simply we are calling a list of apis. When ever the first api fail, we are calling the next api!.

# Installation

## Let's get started

1. First of all install all the required dependencies

```node
npm i
```

2. Now, simply just run the server using

```npm
npm run start
```

3. Configure the URLs to call in the admin page http://127.0.0.1:3000/admin
4. Then you are ready to use the server, by simply calling the api. For example "http://127.0.0.1:XXXX/users". Where the "http://127.0.0.1" is the local server (Dynamic Mock Server) and "XXXX" is the Port number. And "users" is the API path you want to hit.

Now the server will call all the configured URLs one by one until it get a valid response.

## Update

When updating the tool sometimes we need to migrate the data base to the latest version. This will delete all records in the data base.

```node
npm run migrate
```

This will migrate the data base. Note, all records will be destroyed

# Configuration

To configure the urls you need to go the Admin Page http://127.0.0.1:3000/admin

## Supported request methods

- POST
- GET
- PATCH

# Future consideration

None at the moment
