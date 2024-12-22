
const formModel= require("../models/connectusFormSchema")


//form submission
exports.addForm= async function(req,res){
   try{
    const{ fullName,phone,email,location,infoFrom}= req.body;
    if (!fullName || !phone || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }
    const formAdd = await formModel.create({
        fullName,
        phone,
        email,
       location,
       infoFrom
      });
      res.status(200).json({
        message: "Form submitted successfully",
        data: formAdd,
      });
    } catch (err) {
      console.error(err);
      res.status(406).json({
        message: "please try again"
    })
   }}
   



//get All Forms
exports.getForm = async function (req,res){
   try{
    const forms= await formModel.find()
    res.status(200).json(forms)
   } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
};
