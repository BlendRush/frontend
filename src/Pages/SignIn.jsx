// src/Pages/SignIn.jsx
import React, { useState } from "react";
import signupBg from "../assets/signup.png";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function SignIn() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Login submit:", values);
      setTimeout(() => navigate("/home"), 600);
    } finally {
      setLoading(false);
    }
  };

  const passwordFieldValidation = (_, value) => {
    if (!value) return Promise.reject("Password is required!");
    if (value.length < 6)
      return Promise.reject("Password should be at least 6 characters long");
    return Promise.resolve();
  };

  // Change this to your backend auth route if needed
  const googleAuth = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      {/* CARD */}
      <div
        className="
          bg-white/0 rounded-2xl -mt-18 shadow-xl ring-1 ring-black/5 backdrop-blur
          p-6 sm:p-8 w-[600px] max-w-[90vw] -mt-44 h-[auto]
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
              autoComplete="off"
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

          {/* Submit */}
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
        </Form>

        
        {/* Google Sign-In */}
        <div className="flex justify-center mb-2">
          <Button
            type="default"
            className="flex items-center  gap-2 !px-5 !py-2 rounded-full"
            onClick={googleAuth}
          >
            <GoogleOutlined />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
