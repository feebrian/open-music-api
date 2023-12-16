require("dotenv").config();
const Hapi = require("@hapi/hapi");
const AlbumsService = require("./service/postgres/AlbumsService");
const albumsPlugin = require("./api/albums");
const AlbumsValidator = require("./validator/albums");
const ClientError = require("./exceptions/ClientError");
const songsPlugin = require("./api/songs");
const SongsService = require("./service/postgres/SongsService");
const SongsValidator = require("./validator/songs");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

  await server.register([
    {
      plugin: albumsPlugin,
      options: {
        service: new AlbumsService(),
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songsPlugin,
      options: {
        service: new SongsService(),
        validator: SongsValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (req, h) => {
    const { response } = req;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });

        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: "error",
        message: "Terjadi kegagalan pada server kami",
      });

      newResponse.code(500);
      console.error(response);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server start listening on ${server.info.uri}`);
};

init();
