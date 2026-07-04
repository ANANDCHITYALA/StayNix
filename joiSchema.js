const joi = require("joi");

// module.exports.listingSchema = joi.object({
//   listings: joi
//     .object({
//       title: joi.string().required(),
//       description: joi.string().required(),
//       image: joi.object({
//         filename: joi.string().allow(""),
//         url: joi.string().allow(""),
//       }),
//       price: joi.number().required().min(1),
//       location: joi.string().required(),
//       country: joi.string().required(),
//     })
//     .required(),
// });

module.exports.listingSchema = joi.object({
  listings: joi
    .object({
      title: joi.string().required(),

      description: joi.string().required(),

      price: joi.number().required(),

      location: joi.string().required(),

      country: joi.string().required(),
    })
    .required(),
});

module.exports.reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().min(1).max(5).required(),
      comment: joi.string().trim().required(),
    })
    .required(),
});
