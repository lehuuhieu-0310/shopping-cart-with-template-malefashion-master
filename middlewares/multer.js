const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/public/img/product')
    },
    filename: function (req, file, cb) {
        //image.jpg -> ext = .jpg
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'))

        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

module.exports = multer({ storage: storage })