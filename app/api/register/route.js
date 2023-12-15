import dbConfig from "@/lib/dbConfig";
import User from "@/models/users.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();
    await dbConfig();
    const isUser = await User.findOne({ email });
    if (isUser) {
      return NextResponse.json(
        { message: "User Already register with same email" },
        { status: 400 }
      );
    }
    await User.create({ email, password, name });
    return NextResponse.json(
      { message: "Registration Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
