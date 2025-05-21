import type { IPostResponse } from '../../types/common';
import { axiosInstance } from '../axiosInstance';

export const postAuthLogin = async (
  username?: string,
  password?: string,
): Promise<IPostResponse> => {
  if (!username || !password) {
    return {
      success: false,
      message: '아이디와 비밀번호를 입력해주세요.',
    };
  }

  try {
    const res = await axiosInstance.post('/auth/login', {
      username,
      password,
    });

    return {
      success: true,
      message: res.data.message,
    };
  } catch {
    return {
      success: false,
      message: '로그인에 실패했습니다. 다시 시도해주세요.',
    };
  }
};
