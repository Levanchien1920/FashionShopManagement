
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RegisterComponent from '../../components/SignUp';


const Register = () => {
    const [form,setForm]=useState({});
    const [errors,setError]=useState({});
    const onChange=({name,value}) => {
        setForm({...form,[name]:value});
    };

    const onSubmit =() => {
    //    setIsLogIned(true);
    console.log(setIsLogIned);
        if(!form.fullname) {
            
            setError((prev) => {
                return {...prev, fullname:"Please add fullname"};
            })
        }
            if(!form.username) {
                setError((prev) => {
                    return {...prev, username:"Please add username"};
                })
            }
            if(!form.email) {
                setError((prev) => {
                    return {...prev, email:"Please add email"};
                })
            }
            if(!form.phonenumber) {
                setError((prev) => {
                    return {...prev, phonenumber:"Please add phonenumber"};
                })
            }
            if(!form.password) {
                setError((prev) => {
                    return {...prev, password:"Please add password"};
                })
            if(!form.retypepassword) {
                setError((prev) => {
                        return {...prev, retypepassword:"Please add retypepassword"};
                    })
                }
            }
      };
    return (
        <View>
         <RegisterComponent onSubmit={onSubmit} onChange={onChange} form= {form} errors={errors}/>
        </View>
    );
}

export default Register;