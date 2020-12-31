import { TokenGenerator, TokenBase } from 'ts-token-generator';
const tokgen2 = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });

export const randCode = (length: number) => {
  let string = ''
  for (let i = 0; i < length; i++) {
    string += Math.floor(Math.random() * 10)
  }
  return string
};

export const randToken = () => {
  return tokgen2.generate();
};
