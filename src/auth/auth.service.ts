import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService:JwtService) {
  }

    generateToken(payload:User): string {
      const user={id:payload.id , name:payload.name , email:payload.email , password:payload.password}
      return  this.jwtService.sign(user);
    }

   
}