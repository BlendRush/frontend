const metadataServiceURL = "http://localhost:3000/";

export async function userSignUpService(userData) {
  try {
    const response = await fetch(`${metadataServiceURL}api/user/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || "Signup failed",
      };
    }

    return data;
  } catch (error) {
    if (error?.response?.json) {
      try {
        const errorData = await error.response.json();
        return {
          message: errorData.message || "Signup failed",
        };
      } catch {
        // JSON parsing failed
      }
    }
    return {
      message: error.message || "Something went wrong. Please try again later.",
    };
  }
}


export async function userSignInService(userData) {
  try {
    const response = await fetch(`${metadataServiceURL}authUser/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || "Login failed",
      };
    }

    return data;
  } catch (error) {
    console.error("Fetch error in userSignInService:", error);

    return {
      message: "Something went wrong. Please try again later.",
    };
  }
}

