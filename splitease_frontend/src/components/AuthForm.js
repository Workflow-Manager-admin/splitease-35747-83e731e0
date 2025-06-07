import React, { useRef, useState } from "react";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export function AuthForm() {
  const { supabase } = useAuth();
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMessage(error.message);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setMessage(error.message);
        else setMessage("Check your email to confirm!");
      }
    } catch (e) {
      setMessage("Error occurred. Please try again.");
    }
    setLoading(false);
  }

  // PUBLIC_INTERFACE
  const handleGoogleSignin = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setMessage(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4 text-center">{mode === "login" ? "Log In" : "Sign Up"}</h2>
      <div className="mb-4">
        <input
          ref={emailRef}
          type="email"
          required
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          ref={passwordRef}
          type="password"
          required
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {message && (
        <div className="mb-2 text-sm text-red-600 text-center">{message}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 px-4 rounded mb-3 hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : mode === "login" ? "Log In" : "Create Account"}
      </button>

      <button
        type="button"
        onClick={handleGoogleSignin}
        className="w-full bg-accent text-white py-2 px-4 rounded mb-2 hover:bg-orange-500 transition flex items-center justify-center gap-2"
        disabled={loading}
      >
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path fill="#4285F4" d="M21.805 10.023h-9.781v3.977h6.036c-.26 1.254-.909 2.32-1.927 3.032v2.517h3.117c1.822-1.678 2.872-4.155 2.872-6.911a8.55 8.55 0 00-.317-2.615z" /><path fill="#34A853" d="M12.024 22c2.43 0 4.472-.803 5.963-2.178l-3.116-2.517c-.863.573-1.97.916-2.847.916-2.19 0-4.041-1.48-4.698-3.463h-3.2v2.573A9.969 9.969 0 0012.024 22z" /><path fill="#FBBC05" d="M7.326 14.758A5.994 5.994 0 016.48 12a5.995 5.995 0 01.846-2.758v-2.574h-3.2A9.996 9.996 0 002.025 12c0 1.631.39 3.177 1.1 4.332l3.2-2.574z" /><path fill="#EA4335" d="M12.024 6.958c1.321 0 2.505.454 3.432 1.345l2.574-2.574C16.493 3.804 14.451 3 12.024 3a9.969 9.969 0 00-8.153 4.426l3.2 2.573c.657-1.983 2.508-3.463 4.698-3.463z" /></svg>
        </span>
        Sign in with Google
      </button>
      <div className="mt-3 text-center">
        <button
          type="button"
          className="text-primary underline text-sm"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          disabled={loading}
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>
    </form>
  );
}
