import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login} from '../redux/actions/authActions';
import { Redirect } from 'react-router-dom';

const Login = ({login, auth}) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const updateForm = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  return(
    !auth.isAuthenticated ?
    (<div>
      <h1>Login</h1>
      <input onChange={updateForm} name="email" placeholder="Email"/><br/>
      <input onChange={updateForm} name="password" placeholder="Password"/><br/>
      <button onClick={() => login(form)}>Login</button>
    </div>) : (
      <Redirect to={{pathname: '/dashboard'}}/>
    )
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {login})(Login)