const nodemailer= require("nodemailer")

const transporter= nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "datistpham@gmail.com",
        pass: "glilgsktbgwkmoxi"
    }
})

const verifyMail= async (email, code)=> {
    try {
        const result= await transporter.sendMail({from: "datistpham@gmail.com", to: email, subject: "Verify your email", text: "Your code is: "+ code})
        return result
        
    } catch (error) {
        return error
    }
}

module.exports= verifyMail