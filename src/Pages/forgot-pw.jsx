import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import bg from "../assets/fpw.png";
import { useNotification } from "../context/NotificationContext";
import axios from "axios";
import { MailOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ForgotPW = () => {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { openNotification } = useNotification();
  const serviceURL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${serviceURL}user/user/forgot-password`,
        { email: values.email }
      );
      openNotification("success", "Reset Link Send successfully", response.data.message);
      message.success(response.data.message, 5);
      navigate("/login");
      setIsSubmitted(true);
      setIsButtonDisabled(true);
      form.resetFields();
    } catch (err) {
      console.error("Full error:", err);
      const errorMsg = err.response?.data?.message || "Something went wrong";
      openNotification(
        "error",
        "Unable to reset your password",
        errorMsg || "Something went wrong. Please try again."
      );
      message.error(String(errorMsg), 5);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = () => {
    const email = form.getFieldValue("email");
    const emailValid = form.getFieldError("email").length === 0;

    if (email && emailValid && !isSubmitted) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    handleFormChange();
  });

  return (
    <div
      className="relative z-0 min-h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen w-full flex items-center justify-center relative z-10">
        <div className="flex flex-col items-center gap-2 w-full md:w-1/2 max-w-[500px] py-8 bg-white rounded-xl shadow-lg">
          {/* Title */}
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full gap-1 mb-2">
              <Text
                className="text-black text-2xl md:text-3xl font-semibold"
                style={{ fontFamily: "Merienda, cursive" }}
              >
                Reset Your Password
              </Text>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center w-full">
            <Form
              form={form}
              layout="vertical"
              className="w-[380px] sm:w-[400px]"
              onFinish={handleSubmit}
              onFieldsChange={handleFormChange}
            >
              <Form.Item
                name="email"
                label="Enter Your Email "
                rules={[
                  {
                    required: true,
                    message: "Email is required!",
                  },
                  {
                    type: "email",
                    message: "Email is invalid!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
                  onKeyDown={(e) => {
                    const key = e.key;
                    if (!/^[A-Za-z.@0-9]*$/.test(key) && key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                  size="large"
                  maxLength={100}
                  autoComplete="off"
                />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isButtonDisabled}
                    className="w-full md:w-[300px] h-[35px] text-base md:text-lg rounded-full text-white font-bold transition-all duration-300 ease-in-out bg-gradient-to-r from-[#6EE7B7] via-[#3FBFA8] to-[#2CA58D] hover:from-[#3FBFA8] hover:via-[#2CA58D] hover:to-[#207F6A]"
                    loading={isLoading}
                  >
                    Send Reset Link
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPW;
