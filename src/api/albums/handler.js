const ClientError = require("../../exceptions/ClientError");

class AlbumsHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(req, h) {
    try {
      const { name, year } = req.payload;

      const albumId = await this._service.addAlbum({ name, year });

      const response = h
        .response({
          status: "success",
          data: {
            albumId,
          },
        })
        .code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
        return response;
      }
      const response = h
        .response({
          status: "error",
          message: "Maaf server kami sedang mengalami kegagalan",
        })
        .code(500);
      console.error(error);
      return response;
    }
  }

  async getAlbumByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const album = await this._service.getAlbumById(id);

      const response = h.response({
        status: "success",
        data: {
          album,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
        return response;
      }
      const response = h
        .response({
          status: "error",
          message: "Maaf server kami sedang mengalami kegagalan",
        })
        .code(500);
      console.error(error);
      return response;
    }
  }

  async putAlbumByIdHandler(req, h) {
    try {
      const { id } = req.params;
      await this._service.putAlbumById(id, req.payload);

      return {
        status: "success",
        message: "Album berhasil diperbarui",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
        return response;
      }
      const response = h
        .response({
          status: "error",
          message: "Maaf server kami sedang mengalami kegagalan",
        })
        .code(500);
      console.error(error);
      return response;
    }
  }

  async deleteAlbumByIdHandler(req, h) {
    try {
      const { id } = req.params;
      await this._service.deleteAlbumById(id);

      return {
        status: "success",
        message: "Album berhasil dihapus",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
        return response;
      }
      const response = h
        .response({
          status: "error",
          message: "Maaf server kami sedang mengalami kegagalan",
        })
        .code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = AlbumsHandler;
