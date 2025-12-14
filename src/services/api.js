export const loginUser = async (credentials) => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return response.json();
};

export const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
