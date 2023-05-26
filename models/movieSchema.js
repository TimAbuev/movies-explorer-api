const mongoose = require('mongoose');
// const validator = require('validator');

const movieSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
  },
});

module.exports = {
  movieSchema: mongoose.model('movie', movieSchema),
};
