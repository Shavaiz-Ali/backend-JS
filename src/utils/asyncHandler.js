// using promises
const asyncHandler = (fn) => {
 return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };



// using try catch
// const asynchandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     return res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export { asynchandler };

