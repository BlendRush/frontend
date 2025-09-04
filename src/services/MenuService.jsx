const menuServiceURL = "http://localhost:3000/api/menu/";

export async function getMenuService() {
  try {
    const response = await fetch(`${menuServiceURL}menu-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || "Failed to fetch menu items",
      };
    }

    return data;
  } catch (error) {
    console.error("Fetch error in getMenuService:", error);
    return {
      message: "Something went wrong. Please try again later.",
    };
  }
}

