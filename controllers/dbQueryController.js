const User = require("../Models/userModel")
//ne = Not Equal boş olmayan
//eq = Equal boş olan

//Birden fazla match atılabiliyor.


//Ülkere göre kullanıcı dağılımı
exports.countries = async (req, res) => {
  console.log(req);
  await User.aggregate([
    { $match: { userToken: { $ne: null } } },
    { $match: { referrer: { $eq: null } } }
  ])
    .exec()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

};