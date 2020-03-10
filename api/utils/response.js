exports.successResponse = (data, message, status = true) => {
  return {
    status,
    message,
    data,
  };
};

exports.errorResponse = (message) => {
  return {
    status: false,
    message,
    data: null,
  };
};
