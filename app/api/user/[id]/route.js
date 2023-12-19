import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConfig from "@/lib/dbConfig";
import User from "@/models/users.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConfig();
    const token = await getDataFromToken(request)
    console.log(token)
    const users = await User.findById(params?.id)
      .populate("friendsList")
      .populate("requestList");
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
