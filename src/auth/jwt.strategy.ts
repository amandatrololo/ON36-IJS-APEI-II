import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o JWT do header
      ignoreExpiration: false, // Não ignora a expiração
      secretOrKey: process.env.JWT_SECRET_KEY_HML || 'c00rd3n4c40secr3t43sc0l4', // Mesma chave usada para assinar o JWT
    });
  }

  async validate(payload: any) {
    // Valida o JWT e retorna o payload (informações do usuário)
    return { userId: payload.sub, email: payload.email, funcao: payload.funcao };
  }
}