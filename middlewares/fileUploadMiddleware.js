import multer from "multer";
import path from "path";
import fs from "fs";

function getFolderByMimeType(mimeType) {
  if (mimeType.startsWith("image/")) return "./uploads/images";
  if (mimeType === "application/pdf") return "./uploads/pdfs";
  if (mimeType === "application/msword") return "./uploads/docs";
  return "./uploads/others";
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = getFolderByMimeType(file.mimetype);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const folder = getFolderByMimeType(file.mimetype);
    const filePath = path.join(folder, file.originalname);
    if (fs.existsSync(filePath)) return cb(new Error("File already exists"), false);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
