import { useRef, useState, useEffect, useContext } from "react";
import signupBg from "../assets/signup.png";
import { Form, Input, Checkbox, Button, Typography, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { passwordFieldValidation } from "../helpers/PasswordValidation";
import { userSignUpService } from "../services/UserService";
import { AuthContext } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { setLocalStorageData } from "../helpers/Storage";

const { Text } = Typography;

export default function Register() {
  const [form] = Form.useForm();
  const { setToken } = useContext(AuthContext);
  const { openNotification } = useNotification();

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
      setLoading(true);
      const userData = {
        email: values.email,
        password: values.password,
      };
      const response = await userSignUpService(userData);
      if (response.message === "Successfully Registered") {
        openNotification("success", "Signup Successful", "Welcome!");
        setToken(response?.token);
        setLocalStorageData("token", response?.token);
        setLocalStorageData("user", response?.email);
        setLocalStorageData("userID", response.userID);
        navigate("/menu", { replace: true });
      } else {
        openNotification(
          "error",
          "Signup Failed",
          response.message || "Signup failed.Please try again later"
        );
      }
    } catch (error) {
      console.error("signup error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again later.";

      openNotification("error", "Signup Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      <div className="absolute top-6 left-64">
        <Button
          type="link"
          className="!text-white !font-semibold"
          onClick={() => navigate("/")}
        >
          <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-emerald-500 text-white font-black">
            bR
          </span>
          <div className="leading-tight">
            <div className="text-base font-extrabold tracking-tight text-emerald-600">
              blend<span className="text-slate-800">RUSH</span>
            </div>
          </div>
        </Button>
      </div>
      <div className="p-6 w-[600px] max-w-[90vw] lg:-mt-14 xl:h-[400px] xl:-mt-16 bg-white/0 rounded-2xl shadow-xl ring-1 ring-black/5 backdrop-blur">
        <div className="flex flex-col items-center w-full">
          <Text
            className="text-black text-2xl xl:text-3xl font-extrabold"
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
          className="w-[300px] sm:w-[400px] xl:w-full mx-auto"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            className="lg:mb-1 xl:mb-2"
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
            className="mb-2"
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
            <Checkbox disabled={!form.getFieldValue("scrolledToBottom")}>
              I agree to the{" "}
              <span
                className="text-gray-300 cursor-pointer underline"
                onClick={() => setModalVisible(true)}
              >
                Terms & Privacy Policy
              </span>
            </Checkbox>
          </Form.Item>

          <Form.Item className="lg:-mt-4">
            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="
    !w-full md:!w-[300px] md:!h-[45px] !text-base lg:!text-lg
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

        <div className="text-center text-sm lg:text-base text-white-800 lg:-mt-4 xl:mt-12">
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
          <p style={{ color: "red", fontWeight: "bold" }}>
            🍹 Terms and Conditions
          </p>
          <p>
            Use our app to browse the menu, order drinks, and enjoy rewards.
            Prices and offers may change. Orders are confirmed after payment;
            contact us quickly for changes or cancellations. Don’t misuse the
            app or our content. You can update or delete your data anytime.
          </p>
          <p style={{ fontWeight: "bold" }}>🔒 Privacy Policy</p>
          <p>
            We collect your name, contact info, address, and order history to
            serve you better. Your data is safe with us — we never sell it. We
            share only with trusted partners (e.g., delivery, payment
            processing).
          </p>
          <p>
            <em>Scroll to the bottom to enable acceptance.</em>
          </p>
        </div>
      </Modal>
    </div>
  );
}
