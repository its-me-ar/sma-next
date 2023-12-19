import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request) => {
  try {
    const header = request.headers.get("Authorization");
    const nextData = await getServerSession(authOptions);
    let token = ''
    if (header && header.startsWith('Bearer ')) {
         token = header.split(" ")[1];
         console.log("from bearer")
    }else if(nextData){
        token = nextData?.user?.token
        console.log("from next auth")
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    delete decoded.iat
    delete decoded.exp
    
    return decoded;
  } catch (error) {
    return null;
  }
};
