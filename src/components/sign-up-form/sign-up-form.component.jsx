import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword} = formFields;

    // console.log(formFields);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Password not matched.");
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            // console.log(response);

            await createUserDocumentFromAuth(user, {displayName});
            setFormFields(defaultFormField);
        } catch (error) {
            console.error("User create error.", error);
        }
    }

    return (
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Display Name" 
                type="text" 
                onChange={handleChange} 
                name="displayName" 
                value={displayName} 
                required
                />

                <FormInput 
                label="Email" 
                type="email" 
                onChange={handleChange} 
                name="email" 
                value={email} 
                required
                />
                
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>

                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignUpForm;