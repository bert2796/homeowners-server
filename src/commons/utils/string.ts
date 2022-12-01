import * as bcrypt from 'bcrypt';

export const isEmail = (email: string) => {
  const regexp = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return regexp.test(email);
};

export const isSamePassword = async (params: {
  signedPassword: string;
  passwordToCompare: string;
}) => await bcrypt.compare(params.passwordToCompare, params.signedPassword);
