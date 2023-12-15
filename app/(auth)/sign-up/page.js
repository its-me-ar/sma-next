"use client";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { signUpUser } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerSchema } from "@/validations/register";
import { useFormik } from "formik";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const page = () => {
  const dispatch = useAppDispatch();
  const { isLoading, message, isError, isSucess } = useAppSelector(
    (state) => state.user
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
      name: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      let payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      dispatch(signUpUser(payload));
    },
  });

  useEffect(() => {
    if (isSucess) {
      toast(message?.message);
      redirect('/')
    }
  }, [isSucess]);

  return (
    <div className="lg:w-[30%] md:w-[50%] w-full">
      <div className="flex flex-col p-10 mt-[20%]">
        <h1 className="text-[24px] font-semibold uppercase">
          Create a new account
        </h1>
        <p>It's quick and easy.</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-2">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Enter your name "
              type="name"
              required
              name="name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="text-red-500 text-[12px]">
                {formik.errors.name}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <Label htmlFor="Email">Email</Label>
            <Input
              placeholder="Enter your email "
              type="email"
              required
              name="email"
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
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-500 text-[12px]">
                {formik.errors.password}
              </span>
            ) : null}
          </div>

          <div className="mt-2">
            <Label htmlFor="Password">Confirm Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              required
              name="cpassword"
              onClick={() => setError("")}
              {...formik.getFieldProps("cpassword")}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? (
              <span className="text-red-500 text-[12px]">
                {formik.errors.cpassword}
              </span>
            ) : null}
          </div>
          {isError && (
            <span className="text-red-500 text-[12px]">
              {isError && message}
            </span>
          )}
          <div className="mt-3 rounded-[1px]">
            <button
              className="w-full bg-blue-600 h-[32px] text-white"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <Link href={"/"} className="text-[14px] mt-4 font-semibold">
            Already have account?
          </Link>
        </form>
      </div>

      <p className="text-center mt-[20px] text-[12px]">
        Copyright &copy; {new Date().getFullYear()} SMA
      </p>
    </div>
  );
};

export default page;
