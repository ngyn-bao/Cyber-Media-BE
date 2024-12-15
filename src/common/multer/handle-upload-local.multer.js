import multer from "multer";

import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extFile = path.extname(file.originalname);
    console.log(extFile);
    cb(null, "local" + "-" + uniqueSuffix + extFile);
    console.log({ file: file.fieldname });
  },
});

const upload = multer({ storage: storage });

export default upload;
