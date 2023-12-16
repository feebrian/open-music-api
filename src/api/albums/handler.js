const ClientError = require("../../exceptions/ClientError");

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbumHandler(req, h) {
    this._validator.validateAlbumPayload(req.payload);
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
  }

  async getAlbumByIdHandler(req, h) {
    const { id } = req.params;
    const album = await this._service.getAlbumById(id);

    const response = h.response({
      status: "success",
      data: {
        album,
      },
    });
    return response;
  }

  async putAlbumByIdHandler(req, h) {
    this._validator.validateAlbumPayload(req.payload);
    const { id } = req.params;

    await this._service.putAlbumById(id, req.payload);

    return {
      status: "success",
      message: "Album berhasil diperbarui",
    };
  }

  async deleteAlbumByIdHandler(req, h) {
    const { id } = req.params;
    await this._service.deleteAlbumById(id);

    return {
      status: "success",
      message: "Album berhasil dihapus",
    };
  }
}

module.exports = AlbumsHandler;
