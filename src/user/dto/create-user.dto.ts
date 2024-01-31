//import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

   
   
   

  
}