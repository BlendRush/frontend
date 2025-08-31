export const passwordFieldValidation = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Password is required!"));
  }

  if (value.length < 6) {
    return Promise.reject(
      new Error("Password should be at least 6 characters long")
    );
  }

  if (!/(?=.*[A-Z])/.test(value)) {
    return Promise.reject(
      new Error("Password should contain at least one capital letter")
    );
  }

  if (!/(?=.*\d)/.test(value)) {
    return Promise.reject(
      new Error("Password should contain at least one number")
    );
  }

  return Promise.resolve();
};
