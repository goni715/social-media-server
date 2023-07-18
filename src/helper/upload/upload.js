const multer = require('multer');
const CurrentDate = require("../DateHelper");


// Multer hepls us save imgs recieved from request in memory


const storage = multer.diskStorage({
    destination: function (req, file, cb) {     //cb=Callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const currentDate = CurrentDate();
        const uniqueSuffix = currentDate + "-" + Math.round(Math.random() * 1e9);
        let extension = file.originalname.split('.')[1];
        cb(null, "GR_"+file.fieldname + "_" + uniqueSuffix+ "."+extension);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/webp'
    )
        cb(null, true); // this means file should be accepted
    else cb(null, false); // this means file should not be accepted
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});

module.exports=upload