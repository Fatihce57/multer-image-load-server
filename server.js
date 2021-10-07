// import packages
const express = require("express");
const path = require("path");

const router = express();
router.use(express.static(path.join(__dirname)));

// uploading images
const multer = require("multer");
const uuid4 = require("uuid").v4;
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/uploads"),
  filename: function (req, file, cb) {
    const fullName =
    uuid4().replace(/-/g, "") + path.extname(file.originalname);
    cb(null, fullName);
  },
});

const upload = multer({ storage: storage });
router.post("/imageupload", upload.single(""), (req, res) =>
  res.json({   
      image: "/uploads/" + req.file.filename,   
  })
);

const PORT = 4000;
router.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`The server is started on port: ${PORT}`)
);



//https://ichi.pro/tr/node-js-uygulamalarinda-multer-ile-dosya-yukleyin-208100977885636