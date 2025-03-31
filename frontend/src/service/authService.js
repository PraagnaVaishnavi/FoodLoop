const API_URL = "https://yourbackend.com/api/auth"; // Replace with actual backend URL

export const signupUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Signup failed" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem("token", data.token); // Store JWT token
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed" };
  }
};

export const logoutUser = async () => {
  localStorage.removeItem("token"); // Remove JWT on logout
  return true;
};
