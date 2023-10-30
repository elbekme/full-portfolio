// import '../pages/login.css';
// import {Link} from 'react-router-dom'

// const RegisterPage = () => {
  
//   return (<>
//     <div className="login-page">
//     <div className="login">
//     <form className="signIn">
//     <h3>Welcome<br />Back!</h3>
//     <input
//       type="firstname"
//       className="w100"
//       placeholder="Insert firstname"
//       name="firstName"
//       autoComplete="off"
//       required
//     />
//      <input
//       type="lastname"
//       className="w100"
//       placeholder="Insert lastname"
//       name="lastName"
//       autoComplete="off"
//       required
//     />
//     <input
//       type="username"
//       className="w100"
//       placeholder="Insert username"
//       name="username"
//       autoComplete="off"
//       required
//     />
//     <input type="password" name="password" placeholder="Insert Password" required />
//     <Link to="/">
//       <button className="form-btn sx back" type="button">
//         Back
//       </button> 
//     </Link>
//     <button className="form-btn dx" type="submit">
//       Log In
//     </button>
//   </form>
//   </div>
//   </div>
//   </>
//   )
// }

// export default RegisterPage

import '../pages/login.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const { firstName, lastName, username, password } = formData;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    });
  };

  return (
    <>
      <div className="login-page">
        <div className="login">
          <form className="signIn" onSubmit={handleLogin}>
            <h3>Welcome<br />Back!</h3>
            <input
              type="text"
              className="w100"
              placeholder="Insert firstname"
              name="firstName"
              autoComplete="off"
              value={firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              className="w100"
              placeholder="Insert lastname"
              name="lastName"
              autoComplete="off"
              value={lastName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              className="w100"
              placeholder="Insert username"
              name="username"
              autoComplete="off"
              value={username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Insert Password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <Link to="/">
              <button className="form-btn sx back" type="button">
                Back
              </button>
            </Link>
            <button className="form-btn dx" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;