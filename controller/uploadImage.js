const expressAsyncHandler = require("express-async-handler");
const mime= require("mime")
const { v4 } = require("uuid")
const fs= require("fs")

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
}


const uploadImage= expressAsyncHandler(async (req, res)=> {
    const {image }= req.body

    try {
        const decodedImg = decodeBase64Image(image);
        const imageBuffer = decodedImg.data;
        const type = decodedImg.type;
        const extension = mime.getExtension(type);
        const fileName= v4()
        try{
            fs.writeFileSync("./assets/i/" + fileName + "."+ extension , imageBuffer, 'utf8');
            return res.status(200).json({img: "http://localhost:4000/i/" + fileName + "."+ extension})
        }
        catch(err){
            console.error(err)
            return res.status(200).json({img: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({img: false})
    }
})

module.exports= uploadImage
