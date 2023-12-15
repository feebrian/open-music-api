require("dotenv").config();
const Hapi = require("@hapi/hapi");
const AlbumsService = require("./service/postgres/AlbumsService");
const albumsPlugin = require("./api/albums");
const AlbumsValidator = require("./validator/albums");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

  await server.start();

  await server.register({
    plugin: albumsPlugin,
    options: {
      service: new AlbumsService(),
      validator: AlbumsValidator,
    },
  });

  console.log(`Server start listening on ${server.info.uri}`);
};

init();
