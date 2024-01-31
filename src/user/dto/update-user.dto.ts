import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateUserDto{
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