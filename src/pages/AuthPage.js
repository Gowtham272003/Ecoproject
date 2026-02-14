import React, { useState } from "react";
import { PUBLIC_API } from "../api/api";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/Tablet login-bro.png";

function AuthPage({ setIsAuth }) {
  const [mode, setMode] = useState("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ================= LOGIN =================
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await PUBLIC_API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      setIsAuth(true);

      if (res.data.role === "ADMIN") navigate("/admin-dashboard");
      else if (res.data.role === "SELLER") navigate("/seller-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= SIGNUP =================
  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("All fields required");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email");
      return;
    } else setEmailError("");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await PUBLIC_API.post("/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
        role,
      });

      alert(res.data);
      setMode("login");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={wrapper}>
        {/* FORM */}
        <div style={card}>
          <h2 style={title}>
            {mode === "login" ? "Welcome Back 👋" : "Create Account"}
          </h2>

          <div style={toggle}>
            <button
              style={mode === "login" ? activeTab : tab}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              style={mode === "signup" ? activeTab : tab}
              onClick={() => setMode("signup")}
            >
              Signup
            </button>
          </div>

          <input
            style={input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {mode === "signup" && (
            <>
              <input
                style={input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p style={error}>{emailError}</p>}

              <select
                style={input}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">User</option>
                <option value="SELLER">Seller</option>
                <option value="ADMIN">Admin</option>
              </select>
            </>
          )}

          {/* PASSWORD */}
          <div style={passwordBox}>
            <input
              style={{ ...input, marginBottom: 0 }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {mode === "signup" && (
            <input
              style={input}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button
            style={{
              ...submit,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
            onClick={mode === "login" ? handleLogin : handleSignup}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </div>

        {/* IMAGE */}
        <div style={imageBox}>
          <img src={loginImage} alt="Login" style={image} />
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
};

const wrapper = {
  display: "flex",
  alignItems: "center",
  gap: "30px",
  flexWrap: "wrap",
};

const card = {
  width: "360px",
  background: "#fff",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

const imageBox = {
  width: "420px",
  display: "flex",
  justifyContent: "center",
};

const image = {
  width: "100%",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
};

const toggle = {
  display: "flex",
  background: "#f1f1f1",
  borderRadius: "8px",
  marginBottom: "20px",
};

const tab = {
  flex: 1,
  padding: "10px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontWeight: "bold",
};

const activeTab = {
  ...tab,
  background: "#1976d2",
  color: "#fff",
  borderRadius: "8px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const passwordBox = {
  position: "relative",
  marginBottom: "12px",
};

const eye = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const submit = {
  width: "100%",
  padding: "14px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

const error = {
  color: "red",
  fontSize: "12px",
  marginBottom: "10px",
};

export default AuthPage;