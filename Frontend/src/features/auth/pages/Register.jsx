import { useState } from "react";
import { Link } from "react-router";
import "../auth.from.scss";

export default function Register() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setStatus(result.message || (response.ok ? "Success" : "Request failed"));
    } catch {
      setStatus("Unable to reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <div className="from-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" autoComplete="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoComplete="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" autoComplete="new-password" required />
          </div>
          <button className="button primary-button" disabled={busy} type="submit">Register</button>
        </form>
        <p role="status">{status}</p>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  );
}
