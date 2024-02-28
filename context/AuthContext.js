import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import {
  login as loginService,
  logout as logoutService
} from '../services/auth.service';
import { getCustomerInfoByIdService } from '../services/customer.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const login = async (username, password) => {
    setIsLoading(true);
    const { data: userInfoResponse } = await loginService({
      username,
      password
    });

    const userInformation = {
      id: userInfoResponse?.data?.userInfor?.id,
      name: userInfoResponse?.data?.userInfor?.name,
      customerId: userInfoResponse?.data?.userInfor?.customerId,
      customerInfo: null,
      role: userInfoResponse?.data?.userInfor?.role,
      isDeleted: userInfoResponse?.data?.userInfor?.isDeleted,
      token: userInfoResponse?.data?.jwtToken
    };

    setUserInfo(userInformation);
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInformation));

    // Get customer info and update
    if (userInfoResponse?.data?.userInfor?.customerId) {
      const customerData = await getCustomerInfo(
        userInfoResponse?.data?.userInfor?.customerId
      );

      delete customerData.user;
      userInformation.customerInfo = customerData;
      
      setUserInfo(userInformation);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInformation));
      console.log('customerData: ', userInformation);
    }

    setIsLoading(false);
  };

  const loginWithGG = async (userInfoResponse) => {
    setIsLoading(true);
    const userInformation = {
      id: userInfoResponse?.userInfor?.id,
      name: userInfoResponse?.userInfor?.name,
      customerId: userInfoResponse?.userInfor?.customerId,
      customerInfo: null,
      role: userInfoResponse?.userInfor?.role,
      isDeleted: userInfoResponse?.userInfor?.isDeleted,
      token: userInfoResponse?.jwtToken
    };

    setUserInfo(userInformation);
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInformation));

    // Get customer info and update
    if (userInfoResponse?.userInfor?.customerId) {
      const customerData = await getCustomerInfo(
        userInfoResponse?.userInfor?.customerId
      );

      delete customerData.user;
      userInformation.customerInfo = customerData;
 
      setUserInfo(userInformation);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInformation));
      console.log('customerData GG: ', userInformation);
    }

    setIsLoading(false);
  };

  const getCustomerInfo = async (customerId) => {
    setIsLoading(true);
    const response = await getCustomerInfoByIdService(customerId);
    const customerData = response?.data?.data;
    setIsLoading(false);
    return customerData;
  };

  const logout = async () => {
    setIsLoading(true);

    const isLogout = await logoutService();
    if (isLogout) {
      console.log('isLogout', isLogout);

      AsyncStorage.removeItem('userInfo');
      setUserInfo({});
    } else {
      console.log('logout failed');
    }
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        loginWithGG,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};
