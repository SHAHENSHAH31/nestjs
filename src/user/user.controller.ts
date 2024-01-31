
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    Inject,
    forwardRef
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UserService } from './user.service';
  import { AuthService } from 'src/auth/auth.service';


  

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
      @Inject(forwardRef(() => AuthService))
      private authService: AuthService,
      ) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getUsers() {
    return this.userService.get();

  }

  @Post ('/login')
  @UseGuards(AuthGuard("local"))
  login(@Request() req): string{
   const token= this.authService.generateToken(req.user);
    return token
  }

  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch('/:userId')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.update(updateUserDto, userId);
  }
   
 
  @UseGuards(AuthGuard("jwt"))
  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.show(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
