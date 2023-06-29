const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

const sendResetPassword = async (name, email, shippingAddress, res) => {
  try {
    console.log(process.env.EMAILUSER, name);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: "Order Confirmation",
      html: `
    <div style="text-align: center;">
      <img src="https://www.thetechbag.com/images/landing/hero.jpg" alt="Product Image" style="max-width: 100%; height: auto;">
    </div>
    <h2 style="font-size: 24px; text-align: center;">Hi ${name},</h2>
    <p style="font-size: 16px;">Your order has been confirmed and will be shipped to the following address:</p>
    <p style="font-size: 16px;">${shippingAddress}</p>
    <p style="font-size: 16px;">Thank you for choosing our service!</p>
    <p style="font-size: 16px;">Best regards,</p>
    <p style="font-size: 16px;">TechBag</p>
  `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:- ", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const buyNowController = asyncHandler(async (req, res) => {
  try {
    const { name, email, shippingAddress, paymentMethod } = req.body;

    // Save customer details to the database
    const order = await prisma.form.create({
      data: {
        name,
        email,
        shippingAddress,
        paymentMethod,
      },
    });

    sendResetPassword(name, email, shippingAddress, res);

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = { buyNowController };
