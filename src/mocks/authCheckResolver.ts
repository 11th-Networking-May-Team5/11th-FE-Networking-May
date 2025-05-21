import { HttpResponse } from 'msw';

export const authCheckResolver = () => {
  return HttpResponse.json({
    code: 'USER-002',
    message: '존재하지 않는 회원',
  });
};
