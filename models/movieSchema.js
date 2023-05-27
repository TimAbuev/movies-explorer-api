const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    // movieId: {
    //   type: Number,
    //   required: true,
    // },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = {
  movieSchema: mongoose.model('movie', movieSchema),
};
