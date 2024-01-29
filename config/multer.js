
//failu ivesties konfiguracija: su ja kelisis failai i serveri
const multer = require("multer") // modulis kuris gali dirbti su filas ir juos valdyti kuriuos gauname is pacios formos iskaitant nuotraukas
const path = require("path"); //gaunamas "extension"

const storage = multer.diskStorage ({ //kur failas tures nukeliauti (public-imagaes)
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },

    filename: function (req, file, cb) { //kai gausime faila, nustatomas koks bus jo pavadinimas
        const extension = path.extname(file.originalname);
        const lastFileName = file.fieldname + "-" + Date.now() + extension; //kai sukuriamas naujas failas, jo pavadinimas ivardinamas siame kitmajame
        module.exports.lastFileName = lastFileName; //kas karta kai ikeliamas naujas failas, yra tanaujinamas module.export.lastFileName
        cb(null, lastFileName); //failo pavadinimas
    },
});

const upload = multer ({storage});
module.exports = {upload};
