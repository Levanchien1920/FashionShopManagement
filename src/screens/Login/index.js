import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import LoginComponent from "../../components/Login";
import { Alert } from "react-native";
import { GlobalContext } from "../../context/Provider";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../helper/axiosInstance";
const Login = () => {
  const [form, setForm] = useState({});
  const { params } = useRoute();
  const [errors, setErrors] = useState({});
  const { navigate } = useNavigation();

  const [test, setTest] = useState(false);
  useEffect(() => {
    if (test) {
      Alert.alert(`Wrong username or password`);
    }
    setTest(false);
  }, [test]);
  const [errLogin, setErrLogin] = useState(false);

  useEffect(() => {
    if (errLogin) {
      Alert.alert(`Wrong role customer`);
    }
    setErrLogin(false);
  }, [errLogin]);

  React.useEffect(() => {
    if (params?.data) {
      setForm({ ...form, username: params.data.username });
    }
  }, [params]);

  const {
    authDispatch,
    authState: { error, loading },
  } = useContext(GlobalContext);

  const onSubmit = () => {
    setErrors((prev) => {
      return { ...prev, username: "" };
    });
    setErrors((prev) => {
      return { ...prev, password: "" };
    });
    if (!form.username) {
      setErrors((prev) => {
        return { ...prev, username: "Please add a username" };
      });
    }

    if (!form.password) {
      setErrors((prev) => {
        return { ...prev, password: "Please add a password" };
      });
    }

    if (form.username && form.password) {
      const login = {
        username: form.username,
        password: form.password,
      };

      axiosInstance
        .post("/auth/login", login)
        .then((response) => {
          if (response.data.info.roleNames[0] === "customer") {
            const { token, info } = response.data;

            AsyncStorage.setItem("token", token);

            AsyncStorage.setItem("id", info.id.toString());

            AsyncStorage.setItem("username", info.username);

            AsyncStorage.setItem("fullname", info.fullName);

            authDispatch({
              type: "LoginSuccess",
            });
            navigate("Home");
          } else {
            setErrLogin(true);
          }
        })
        .catch((error) => {
          setTest(true);
        });
    }
  };

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      error={error}
      errors={errors}
    />
  );
};

export default Login;