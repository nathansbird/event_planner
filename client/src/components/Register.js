import React, { useState } from 'react';
import {connect} from 'react-redux';
import {register} from '../redux/actions/authActions';

const Register = ({register, auth}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const updateForm = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value})
  }
  
  return(
    <div>
      <h1>Register</h1>
      <input name="name" value={form.name} onChange={(e) => updateForm(e)} placeholder="Full Name"/><br/>
      <input name="email" value={form.email} onChange={(e) => updateForm(e)} placeholder="Email"/><br/>
      <input type="password" name="password" value={form.password} onChange={(e) => updateForm(e)} placeholder="Password"/><br/>
      <input type="password" name="password2" value={form.password2} onChange={(e) => updateForm(e)} placeholder="Confirm Password"/><br/>
      <button onClick={() => {register(form)}}>Create Account</button>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {register})(Register)