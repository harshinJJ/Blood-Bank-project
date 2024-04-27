
const Donerdetail = require("../model/donerdata");


  const donerview = async (req,res) => {
    try {
        const donerdetails = await Donerdetail.find();
        console.log(donerdetails);
        res.render("Doner", { donerdetails });
      } catch (error) {
    
      }
}

module.exports = donerview