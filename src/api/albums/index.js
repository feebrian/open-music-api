const AlbumsHandler = require("./handler");
const routes = require("./routes");

const albumsPlugin = {
  name: "albums",
  version: "1.0.0",
  register: async (server, { service }) => {
    const albumsHandler = new AlbumsHandler(service);
    server.route(routes(albumsHandler));
  },
};

module.exports = albumsPlugin;
