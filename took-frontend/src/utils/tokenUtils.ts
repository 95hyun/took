const TOKEN_KEY = 'took_auth_token';
const REFRESH_TOKEN_KEY = 'took_refresh_token';
const USER_INFO_KEY = 'took_user_info';

export interface UserInfo {
  memberId: number;
  teamId: number;
  teamName: string;
}

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshTokenFromStorage = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getUserInfoFromStorage = (): UserInfo | null => {
  const userInfoStr = localStorage.getItem(USER_INFO_KEY);
  if (!userInfoStr) return null;
  try {
    return JSON.parse(userInfoStr) as UserInfo;
  } catch (e) {
    clearTokenFromStorage();
    return null;
  }
};

export const setTokenToStorage = (token: string, refreshToken: string, userInfo: UserInfo): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export const clearTokenFromStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getTokenFromStorage();
};
