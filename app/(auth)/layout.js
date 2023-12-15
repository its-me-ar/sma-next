import Image from "next/image";
import bgImage from "../../assets/bg.png";

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen">
      <div className="lg:flex md:flex flex-row">
        <div className="lg:w-[70%] md:w-[50%]  lg:block md:block hidden">
          <Image
            src={bgImage}
            alt="SMA APP"
            width={1920}
            height={720}
            priority={false} 
            className="object-cover h-[100vh]"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
