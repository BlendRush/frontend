// src/Pages/Register.jsx
import React, { useRef, useState, useEffect } from "react";
import signupBg from "../assets/signup.png";
import { Form, Input, Checkbox, Button, Typography, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Terms modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (modalVisible) {
      setScrolledToBottom(false);
      form.setFieldsValue({ scrolledToBottom: false });
      setTimeout(() => {
        const el = contentRef.current;
        if (el && el.scrollHeight <= el.clientHeight + 1) {
          setScrolledToBottom(true);
          form.setFieldsValue({ scrolledToBottom: true });
        }
      }, 0);
    }
  }, [modalVisible, form]);

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    if (atBottom) {
      setScrolledToBottom(true);
      form.setFieldsValue({ scrolledToBottom: true });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Register submit:", values);
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

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      {/* CARD — centered, then nudged DOWN to sit inside the monitor */}
      <div
        className="
          bg-white/0 rounded-2xl shadow-xl ring-1 ring-black/5 backdrop-blur
          p-6 sm:p-8 w-[600px] max-w-[90vw] -mt-44 h-[460px]
          
        "
      >
        <div className="flex flex-col items-center w-full gap-10">
          <Text
            className="text-black text-3xl font-extrabold"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Register
          </Text>
          <Text
            className="text-[15px] font-normal text-center"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Let's get you started with blendRUSH!
          </Text>
        </div>

        <Form
          layout="vertical"
          form={form}
          className="w-full"
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

          <Form.Item name="scrolledToBottom" initialValue={false} hidden>
            <input type="hidden" />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) return Promise.reject("You must agree to terms");
                  if (!getFieldValue("scrolledToBottom"))
                    return Promise.reject("Please scroll and read all terms");
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Checkbox>
              I agree to the{" "}
              <button
                type="button"
                className="text-white-600 underline"
                onClick={() => setModalVisible(true)}
              >
                Terms & Privacy Policy
              </button>
            </Checkbox>
          </Form.Item>

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
                Sign Up
              </Button>
            </div>
          </Form.Item>
        </Form>

        <div className="text-center text-sm md:text-base text-white-800 " >
          Already have an account?{" "}
          <Link to="/sign-in" className="text- white-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Terms Modal */}
      <Modal
        title="Terms & Conditions and Privacy Policy"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          if (!scrolledToBottom) return;
          form.setFieldsValue({ agree: true, scrolledToBottom: true });
          setModalVisible(false);
        }}
        okButtonProps={{ disabled: !scrolledToBottom }}
      >
        <div
          ref={contentRef}
          onScroll={handleScroll}
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "16px",
            border: "1px solid #ccc",
            fontFamily: "Roboto, sans-serif",
            fontSize: "13px",
            lineHeight: "1.6",
          }}
        >
          <p style={{ color: "red", fontWeight: "bold" }}>🍹 Terms and Conditions</p>
          <p>

            Use our app to browse the menu, order drinks, and enjoy rewards.

            Prices and offers may change.

            Orders are confirmed after payment; contact us quickly for changes or cancellations.

            Don’t misuse the app or our content.



            You can update or delete your data anytime.</p>
          <p style={{ fontWeight: "bold" }}>🔒 Privacy Policy</p>
          <p> 

            We collect your name, contact info, address, and order history to serve you better.

            Your data is safe with us — we never sell it.

            We share only with trusted partners (e.g., delivery, payment processing).</p>
          <p>
            <em>Scroll to the bottom to enable acceptance.</em>
          </p>
        </div>
      </Modal>
    </div>
  );
}
