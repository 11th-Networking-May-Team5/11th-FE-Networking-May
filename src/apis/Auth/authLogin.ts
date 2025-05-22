import type { IPostResponse } from '../../types/common';
import { axiosInstance } from '../axiosInstance';

export const postAuthLogin = async (
  username?: string,
  password?: string,
): Promise<IPostResponse> => {
  if (!username || !password) {
    return {
      success: false,
      message: '이름과 비밀번호를 입력해주세요.',
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
      message:
        '비밀번호가 일지하지 않습니다. 가입하지 않으셨다면, 새로운 이름을 입력해주세요.',
    };
  }
};
