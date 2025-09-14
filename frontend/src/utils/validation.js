// ===============================
// USER VALIDATION
// ===============================
export function validateUser({ name, email, address, password }) {
  if (!name || name.length < 20 || name.length > 60) {
    return "Name must be 20-60 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  if (address && address.length > 400) {
    return "Address too long (max 400 chars)";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  if (password !== undefined && !passwordRegex.test(password)) {
    return "Password must be 8-16 chars, include 1 uppercase & 1 special character";
  }

  return null;
}

// ===============================
// STORE VALIDATION
// ===============================
export function validateStore({ name, address }) {
  if (!name || name.length < 3 || name.length > 100) {
    return "Store name must be 3-100 characters";
  }

  

  if (address && address.length > 400) {
    return "Address too long (max 400 chars)";
  }

  return null;
}
