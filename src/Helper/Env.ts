import { Enviroment } from '../Constant/Enviroment';

export const isDevelopmentEnv = () => {
  return Enviroment.NODE_ENV === 'development';
};
