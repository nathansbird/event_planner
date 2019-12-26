import React from 'react';
import {connect} from 'react-redux';
import {register} from '../redux/actions/authActions';

const Register = ({register, auth}) => {
  return(
    <div>
      <input name="email" placeholder="Email"/>
      <input name="password" placeholder="Password"/>
      <input placeholder="Confirm Password"/>
      <button onClick={() => {register("Nathan Bird", "chosenbird1@gmail.com", "skittles4")}}>Submit</button>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {register})(Register)