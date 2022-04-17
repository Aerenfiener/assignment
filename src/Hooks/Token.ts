import { useState } from 'react';
import { AuthStorageService } from '../Services/AuthStorage.service';

export default function useToken() {
  const getToken = (): string => {
    return AuthStorageService.getToken() || '';
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token: string ) => {
    AuthStorageService.setToken(token)
    setToken(token);
  };

  const removeToken = () => {
    AuthStorageService.removeToken();
    setToken('');
  };

  return {
    setToken: saveToken,
    removeToken,
    token
  }
}
