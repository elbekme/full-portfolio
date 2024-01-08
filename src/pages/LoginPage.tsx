import { useNavigate,Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import useAuth from "../store/auth";
import Login from "../types/login";
import User from "../types/user";
import useSkill from "../store/skill";
import { TOKEN, USER } from "../constants/index";
import request from "../server/index";
import '../pages/login.css';


const LoginPage = () => {
  const login = useAuth((state) => state.login);
  const setUser = useSkill((state) => state.setUser);

  const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;
  console.log(userId);
  
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: Login = {
      username: e.currentTarget.username.value.trim(),
      password: e.currentTarget.password.value.trim()
    };
    const {
      data: { token, user },
    } = await request.post<{ token: string; user: User }>(
      "auth/login",
      userData
      );

      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));

      login(user);
      setUser(user);
      navigate("/dashboard");

      if(user.role === "client"){
        toast.success('You are Client!');
      }

      if(user.role === "user"){
        // toast.succes("You are User!");
        navigate("/user");
      }

      if(user.role === "admin") {
        toast.success('You are Admin!');
        Cookies.set(TOKEN, token);
        window.location.href = 'https://portfolio-admin-elbek.vercel.app';
        return;
      }
  };

  return (
    <div className="login-page">
      <div className="login">
        <form className="signUp" onSubmit={submit}>
          <h2 style={{fontFamily: "sans-serif"}}>Create Your Account</h2>
          <p style={{color: 'black', fontFamily:'sans-serif'}}>
            Just enter your username <br />
            and your password for join.
          </p>
          <input
            className="w100"
            type="text"
            name="username"
            placeholder="Insert username"
            required
            autoComplete="off"
          />
          <input
            type="password" name="password"
            placeholder="Insert Password"
            required
          />
          <button style={{backgroundColor: '#47B5FF'}} className="form-btn sx log-in" type="submit">
            Log In
          </button>
          <Link to="/register">
            <button style={{backgroundColor: '#1363DF'}} className="form-btn dx" type="submit">
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
