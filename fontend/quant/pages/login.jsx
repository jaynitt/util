import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg from "../src/assets/bg.jpg";
import logo from "../src/assets/logo.png"
function Login() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/api/auth/login";




    try {
      const res = await axios.post(url, { email, password });


      localStorage.setItem("token", res.data.token);
      navigate("/home");

    }
    catch (err) {
    console.log(err)

    alert("Something went wrong");
  }
};

return (
  <>



    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <span
        className="z-4 absolute top-4 right-4 bg-cover bg-center w-[130px] h-[56px] bg-transparent inline-block"
        style={{ backgroundImage: `url(${logo})` }}
      >
      </span>
      <form
        onSubmit={handleSubmit}
        className="bg-[rgba(0,0,0,.2)] rounded-xl shadow-md w-96 px-6 py-8 backdrop-blur-sm border border-white/10"
      >
        <h2 className="text-3xl mb-6 font-bold text-center">
          Login
        </h2>



        <input
          type="email"
          className="w-full p-2 mb-4 bg-transparent border border-white/30 rounded "
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-2 mb-4 bg-transparent border border-white/30 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full mt-2 bg-[rgba(72,70,202,0.7)] rounded-3xl  p-2 font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>



      </form>
    </div></>
);
}

export default Login;
