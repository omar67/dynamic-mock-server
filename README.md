# Dynamic Mock Server

Where we don't need to worry about the APIs world anymore. Every api must work smoothly.

## How it works

Simply we are calling a list of apis. When ever the first api fail, we are calling the next api!.

## Let's get started

1. Simply just run the server using

```npm
npm run start
```

2. Configure the URLs to call in the admin page http://127.0.0.1/admin
3. Then you are ready to use the server, by simply calling the api. For example "http://127.0.0.1:XXXX/users". Where the "http://127.0.0.1" is the local server (Dynamic Mock Server) and "XXXX" is the Port number. And "users" is the API path you want to hit.

Now the server will call all the configured URLs one by one until it get a valid response.

## Configuration

To configure the urls you need to go the Admin Page http://127.0.0.1/admin

### Supported request methods

- POST
- GET
- PATCH

## Future consideration

- Ability to manage urls through URL; Add/Delete/Reorder URLs
- Ability to manage APIs through URL; specify each API a URL
- Ability to memorize saved URLs
