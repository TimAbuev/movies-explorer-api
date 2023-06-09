const mongoose = require('mongoose');
const validator = require('validator');
const Joi = require('joi');

const regVLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const movieSchema = new mongoose.Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
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
      type: Object,
      required: true,
      // validate: {
      //   validator(value) {
      //     return validator.isURL(value);
      //   },
      // },
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
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
  createMovieSchema: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().required(),
    trailerLink: Joi.string().regex(regVLink).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    id: Joi.number().required(),
    created_at: Joi.date().required(),
    updated_at: Joi.date().required(),
  }),
  paramSchema: Joi.object({
    // movieId: Joi.string().required().hex().length(24),
    movieId: Joi.number().required(),
  }),
};
