const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authUser = async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(200).json({ message: "Login Successful", user: existingUser });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(200).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating or checking user:", error);
    res.status(500).json({ message: "Failed to create or check user" });
  }
};

module.exports = { authUser };
