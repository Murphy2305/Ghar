import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/styles/register.css';

const RegisterPage = () => {

let URL = 'https://ghar-backend.onrender.com/';

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });




  const handleChange = (e) => {
  const { name, value, files } = e.target;
  
  // Handle file input differently
  if (name === "profileImage") {
    setFormData({
      ...formData,
      profileImage: files[0], // Set the file object directly
    });
  } else {
    // Handle other inputs
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  const navigate = useNavigate();
  const [passwordMatch, setpasswordMatch] = useState(true)

  useEffect(() => {
    setpasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  },)



 const handleSubmit = async (e) =>{
    e.preventDefault();
    

      try{
        const register_form = new FormData();

        for(var key in formData)
        {
          register_form.append(key, formData[key]);
        }

        const response = await fetch(`${URL}auth/register` , {

          method: "POST",
          body : register_form
        });

        if(response.ok)
        {
          navigate('/login')
        }
        
      }
      catch(err){
          console.log("Registration failed", err.message);
          
      }





 }

  // console.log(formData);

  return (
    <div className='register'>
      <div className="register_content">
        <form className='register_content_form' onSubmit={handleSubmit}>
          <input type="text" placeholder='First Name' name='firstName' required value={formData.firstName} onChange={handleChange} />
          <input type="text" placeholder='Last Name' name='lastName' required value={formData.lastName} onChange={handleChange} />
          <input type="email" placeholder='Email' name='email' required value={formData.email} onChange={handleChange} />
          <input type="password" placeholder='Password' name='password' required value={formData.password} onChange={handleChange} />
          <input type="password" placeholder='Confirm Password' name='confirmPassword' required value={formData.confirmPassword} onChange={handleChange} />
          {
            !passwordMatch && (
              <p style={{color:"red"}}>Passwords are not matched!</p>
            )
          }
          <input
            id='image'
            type="file"
            name="profileImage"
            accept='image/*'
            required
            style={{display: 'none'}}
            onChange={handleChange}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload your Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Login In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
