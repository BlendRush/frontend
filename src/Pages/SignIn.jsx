// src/Pages/SignIn.jsx
import React, { useContext, useState } from "react";
import signupBg from "../assets/signup.png";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { passwordFieldValidation } from "../helpers/PasswordValidation";
import { setLocalStorageData } from "../helpers/Storage";
import { userSignInService } from "../services/UserService";
import { useNotification } from "../context/NotificationContext";

const { Text } = Typography;

export default function SignIn() {
  const serviceURL = process.env.REACT_APP_API_URL;
  const [form] = Form.useForm();
  const { setToken } = useContext(AuthContext);
  const { openNotification } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const userData = {
        email: values.email,
        password: values.password,
      };

      const response = await userSignInService(userData);
      console.log("re", response);

      if (response.message === "Login successful") {
        openNotification("success", "Login Successful", "Welcome back!");

        setToken(response.token);
        setLocalStorageData("token", response.token);
        setLocalStorageData("user", response.email);
        setLocalStorageData("userID", response.userID);
        navigate("/menu", { replace: true });
      } else {
        openNotification(
          "error",
          "Login Failed",
          response.message || "Login failed. Please try again later"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again later.";

      openNotification("error", "Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = () => {
    window.open(`${serviceURL}user/auth/google`, "_self");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      {/* CARD */}
      <div
        className="
          bg-white/0 rounded-2xl shadow-xl ring-1 ring-black/5 backdrop-blur
          p-6 sm:p-8 w-[600px] max-w-[90vw] -mt-24
        "
      >
        <div className="flex flex-col -mt-6 items-center w-full -mb-8 gap-10">
          <Text
            className="text-black text-3xl font-extrabold"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Login
          </Text>
          <Text
            className="text-[15px] font-normal text-center"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Welcome back to blendRUSH — let’s get blending!
          </Text>
        </div>

        <Form
          layout="vertical"
          form={form}
          className="w-full mt-6"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required!" },
              { type: "email", message: "Email is invalid!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
              maxLength={100}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ validator: passwordFieldValidation }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="Password"
              maxLength={60}
            />
          </Form.Item>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Text
              className="cursor-pointer text-sm hover:underline"
              onClick={() => navigate("/forgot-pw")}
            >
              Forgot Password?
            </Text>
          </div>

          {/* Sign In */}
          <Form.Item className="mb-3">
            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="
                  !w-full md:!w-[300px] !h-[45px] !text-base md:!text-lg
                  !rounded-full !text-white !font-bold
                  !transition-all !duration-300 !ease-in-out
                  !bg-gradient-to-r from-[#6EE7B7] via-[#3FBFA8] to-[#2CA58D]
                  hover:!bg-gray-400 hover:from-transparent hover:via-transparent hover:to-transparent
                  border-0
                "
                loading={loading}
              >
                Sign In
              </Button>
            </div>
          </Form.Item>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Sign-In */}
          <div className="flex justify-center">
            <Button
              type="default"
              className="flex items-center gap-2 !px-5 !py-2 rounded-full"
              onClick={googleAuth}
            >
              <GoogleOutlined />
              Sign in with Google
            </Button>
          </div>
        </Form>
      </div>

      {/* OUTSIDE the card: Sign Up CTA */}
      <div className="mt-4 -mb-4 w-full flex justify-center">
        <Button
          type="default"
          className="
            !w-full md:!w-[300px] !h-[45px]
            !rounded-full !font-bold
            !text-emerald-700 !border-emerald-300
            hover:!bg-emerald-50
            bg-white/70 backdrop-blur-sm
          "
          onClick={() => navigate("/register")}
        >
          Create an account
        </Button>
      </div>
    </div>
  );
}
