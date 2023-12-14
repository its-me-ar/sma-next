import dbConfig from "@/lib/dbConfig";
import User from "@/models/users.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();
    await dbConfig();
    await User.create({ email, password, name });
    return NextResponse.json(
      { message: "Registration Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }
}
