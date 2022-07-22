import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormField = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const {email, password} = formFields;

    // console.log(formFields);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            
            setFormFields(defaultFormField);
        } catch (error) {
            // console.error("User create error.", error);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                label="Email" 
                type="email" 
                onChange={handleChange} 
                name="email" 
                value={email} 
                required
                />
                
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>

                <div className="button-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" onClick={logGoogleUser}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;