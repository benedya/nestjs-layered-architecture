import process from 'process';

export const isDevelopmentEnv = () => {
  return process.env.NODE_ENV === 'development';
};
