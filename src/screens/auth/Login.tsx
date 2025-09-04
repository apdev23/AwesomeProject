import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AppDispatch } from '../../redux/store'
import { fetchLogin, resetAuthState } from '../../redux/slice/Auth'
import TextInputComponent from '../../components/TextInputComponent';
import { LoginStyle } from '../../styles';

// Validation schema
const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = {
  username: string
  password: string
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isLoggedIn, user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log("Auth state changed:", { user });
  }, [loading, error, isLoggedIn]);

  useEffect(() => {
    // Reset auth state when component mounts
    dispatch(resetAuthState());
  }, [dispatch]);


  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/users/1')
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  // }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: 'johnd',
      password: 'm38rmF$',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    console.log('=== FORM SUBMITTED ===')
    console.log('Login data:', data)
    console.log('About to dispatch fetchLogin...')
    dispatch(fetchLogin(data))
  }
  return (
    <View style={LoginStyle.container}>
      <Text style={LoginStyle.title}>Login</Text>

      <View style={LoginStyle.formContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInputComponent
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Username"
                autoCapitalize="none"
                maxLength={50}
                inputStyle={errors.username ? LoginStyle.errorInput : undefined}
              />
              {errors.username && (
                <Text style={LoginStyle.errorText}>{errors.username.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInputComponent
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                maxLength={100}
                inputStyle={errors.password ? LoginStyle.errorInput : undefined}
              />
              {errors.password && (
                <Text style={LoginStyle.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={[LoginStyle.loginButton, loading && LoginStyle.disabledButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={LoginStyle.loginButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
        {/* 
        {error && (
          <Text style={LoginStyle.errorText}>{error}</Text>
        )} */}


      </View>
    </View>
  )
}

export default Login