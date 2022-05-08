# Dynamic Mock Server

Where we don't need to worry about the APIs world anymore. Every api must work smoothly.

## How it works

Simply we are calling a list of apis. When ever the first api fail, we are calling the next api!.

## Let's get started

1. First of all you need enter the list of URLs in the <b>config.js</b> file
2. After that simply run the server using

```npm
npm run start
```

3. Then you are ready to use the server, by simply calling the api. For example "http://127.0.0.1:XXXX/users". Where the "http://127.0.0.1" is the local server (Dynamic Mock Server) and "XXXX" is the Port number.

### Supported request methods

- POST
- GET
- PATCH

## Future consideration

- Ability to manage urls through URL; Add/Delete/Reorder URLs
- Ability to manage APIs through URL; specify each API a URL
- Ability to memorize saved URLs
