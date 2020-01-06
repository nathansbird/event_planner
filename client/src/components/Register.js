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
      <input name="name" value={form.name} onChange={(e) => updateForm(e)} placeholder="Full Name"/>
      <input name="email" value={form.email} onChange={(e) => updateForm(e)} placeholder="Email"/>
      <input type="password" name="password" value={form.password} onChange={(e) => updateForm(e)} placeholder="Password"/>
      <input type="password" name="password2" value={form.password2} onChange={(e) => updateForm(e)} placeholder="Confirm Password"/>
      <button onClick={() => {register(form)}}>Submit</button>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {register})(Register)