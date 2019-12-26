import React from 'react'
import { connect } from 'react-redux';

const Login = () => {
  return(
    <form>
      <input name="email" placeholder="Email"/>
      <input name="password" placeholder="Password"/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login