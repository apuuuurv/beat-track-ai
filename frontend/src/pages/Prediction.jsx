// At the top of your function or component
const API_URL = import.meta.env.VITE_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // CHANGE THIS LINE:
    // From: fetch('/predict')
    // To: fetch(`${API_URL}/predict`)
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    // ... handle your result
  } catch (err) {
    console.error("Fetch error:", err);
  }
};
