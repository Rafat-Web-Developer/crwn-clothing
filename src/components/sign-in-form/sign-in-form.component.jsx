import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
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
        await signInWithGooglePopup();
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response);
            setFormFields(defaultFormField);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password!!");
                    break;

                case 'auth/user-not-found':
                    alert("Invalid user!!");
                    break;
            
                default:
                    console.error(error);
                    break;
            }
        }
    }

    return (
        <div className="sign-in-container">
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

                <div className="sign-in-button-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;