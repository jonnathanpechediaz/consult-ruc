exports.getDomain = (req) => {
  const hostName = req.hostname;
  const hostNameParts = hostName.split('.');
  if (hostNameParts.length < 2) {
    return 'localhost';
  }

  hostNameParts.splice(0, 1);
  return hostNameParts.join('.');
};
