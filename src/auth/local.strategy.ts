import { Injectable, UnauthorizedException ,Inject,forwardRef} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entity/user.entity';
//import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor( @Inject(forwardRef(() => UserService))
  private userService: UserService,) {
    super({ usernameField: 'email' });
  }

    async validate(email: string, password: string): Promise<User> {
    console.log("hi",email,password);
    const user: any =  await this.userService.findByEmail(email);
    console.log(user);
    if (user===undefined) { 
      throw new UnauthorizedException();
    }
    if(user!= undefined && user.password===password){
        return user;
    }
    else{
        throw new UnauthorizedException();
    }
    }
    
}