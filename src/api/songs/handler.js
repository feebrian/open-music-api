class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHandler(req, h) {
    this._validator.validateSongsPayload(req.payload);
    const { title, year, genre, performer, duration, albumId } = req.payload;

    const songId = await this._service.addSong({
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

    const response = h
      .response({
        status: "success",
        data: {
          songId,
        },
      })
      .code(201);
    return response;
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();

    return {
      status: "success",
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(req, h) {
    const { id } = req.params;
    const song = await this._service.getSongById(id);

    const response = h.response({
      status: "success",
      data: {
        song,
      },
    });
    return response;
  }

  async putSongByIdHandler(req, h) {
    this._validator.validateSongsPayload(req.payload);

    const { id } = req.params;

    await this._service.putSongById(id, req.payload);

    const response = h.response({
      status: "success",
      message: "Lagu berhasil diperbarui",
    });
    return response;
  }

  async deleteSongByIdHandler(req, h) {
    const { id } = req.params;

    await this._service.deleteSongById(id);

    const response = h.response({
      status: "success",
      message: "Lagu berhasil dihapus",
    });
    return response;
  }
}

module.exports = SongsHandler;
