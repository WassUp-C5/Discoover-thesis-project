const multer = require("multer");
const Datauri = require("datauri");
const path = require("path");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("file");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dataUri = (req) => {
  console.log("fila name ====>>> ",req.file.originalname);
  return parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
    );
};
module.exports = { multerUploads, dataUri };
