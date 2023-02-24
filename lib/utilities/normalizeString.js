const normalizeString = (str) =>
  str
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

module.exports = normalizeString;
