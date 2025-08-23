import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import bg from "../assets/fpw.png";

const { Text } = Typography;

const ForgotPW = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsButtonDisabled(newPassword.trim().length === 0);
  }, [newPassword]);

  // Simple inline validator to avoid external imports
  const validatePassword = async (_rule, value) => {
    if (!value) return Promise.reject(new Error("Please enter a password"));
    if (value.length < 8) return Promise.reject(new Error("At least 8 characters required"));
    return Promise.resolve();
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/authuser/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Request failed");

      message.success(data?.message || "Password reset successful", 5);
      setNewPassword("");
      setIsButtonDisabled(true);
      form.resetFields();
    } catch (err) {
      message.error(err?.message || "Something went wrong. Please try again.", 5);
      console.error("Reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
              layout="vertical"
              className="w-[380px] sm:w-[400px]"
              onSubmitCapture={handleReset}
              form={form}
            >
              <Form.Item
                name="password"
                label="New Password"
                className="custom-label"
                rules={[{ validator: validatePassword, required: true }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  maxLength={60}
                />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isButtonDisabled}
                    className="w-full md:w-[300px] h-[45px] text-base md:text-lg rounded-full text-white font-bold transition-all duration-300 ease-in-out bg-gradient-to-r from-[#6EE7B7] via-[#3FBFA8] to-[#2CA58D] hover:from-[#3FBFA8] hover:via-[#2CA58D] hover:to-[#207F6A]"
                    loading={isLoading}
                  >
                    Reset Password
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
