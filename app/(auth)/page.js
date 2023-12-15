"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { loginSchema } from "../../validations/login";
import Label from "../../components/Label";
import Link from "next/link";
import Input from "../../components/Input";
import { signIn,useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

export default function Page() {
  const [error, setError] = useState(null);
  const search = useSearchParams();
  const callBackUrl = search.get("callbackUrl");
  const [isLoginIn,setisLogedIn] = useState(false)
  const {data:session} = useSession()

  useEffect(() => {
    if(isLoginIn || session?.user){
      redirect("/dashboard")
    }
  }, [isLoginIn,session])
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        redirect: false,
        username: values?.email,
        password: values?.password,
      });
      if (res?.error !== null) {
        let resError = JSON.parse(res?.error);
        setError(
          resError?.message
            ? resError?.message
            : "Something went wrong, Please try agian in sometime"
        );
      } else {
        setisLogedIn(true);
        if (callBackUrl) {
          const url = new URL(callBackUrl);
          const path = url.pathname;
          window.location.replace(path);
        } 
      }
    },
  });
  return (
    <div className="lg:w-[30%] md:w-[50%] w-full">
      <div className="flex flex-col p-10 mt-[20%]">
        <h1 className="text-[24px] font-semibold uppercase">Login</h1>
        <p>SMA helps you connect and share with the people in your life.</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-2">
            <Label htmlFor="Email">Email</Label>
            <Input
              placeholder="Enter your email "
              type="email"
              required
              name="email"
              onClick={() => setError("")}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-500 text-[12px]">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <Label htmlFor="Password">Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              required
              name="password"
              onClick={() => setError("")}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-500 text-[12px]">
                {formik.errors.password}
              </span>
            ) : null}
          </div>

          {error && <span className="text-red-500 text-[12px]">{error}</span>}
          <div className="mt-3 rounded-[1px]">
            <button
              className="w-full bg-blue-600 h-[32px] text-white"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <Link href={"/sign-up"} className="text-[14px] mt-4 font-semibold">
          Create a Account ?
        </Link>
      </div>

      <p className="text-center mt-[20px] text-[12px]">
        Copyright &copy; {new Date().getFullYear()} SMA
      </p>
    </div>
  );
}
