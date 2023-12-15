import dbConfig from "@/lib/dbConfig";
import User from "@/models/users.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await dbConfig();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 400 }
      );
    }
    const isPasswordVaild = await bcrypt.compare(password, user.password);
    if (!isPasswordVaild) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 400 }
      );
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );
    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
