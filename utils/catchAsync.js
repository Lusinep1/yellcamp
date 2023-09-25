//tryCatch FROM YOUTUBE

// exports.catchAsync = (controller) => async (req, res, next) => {
//   try {
//     await controller(req, res);
//   } catch (error) {
//     return next(error);
//   }
// };

// COLT'S EXAMPLE
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
