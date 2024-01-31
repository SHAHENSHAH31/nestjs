import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    

      // find all user in database
      get(): Promise<User[]> {
        return this.userRepository.find();
      }
    

      // create user in database
      async create(createUserDto: CreateUserDto) {
        const {email}=createUserDto;
        const isEmail=await this.userRepository.findOne({ where: { email } });
        if(isEmail){
         return (
          {
           message:"email is already present"
         }
          );
        }else{
        return this.userRepository.save(createUserDto);
        }
      }

      // update user 
    
      async update(updateUserDto: UpdateUserDto, userId: number) {
        try{
          return await this.userRepository.update(userId, updateUserDto);
        }
        catch(err){
          return({
            message:err
          })
        }
       
      }


    // find user by id
      async show(id: number) {
        try{
          return await this.userRepository.findOne({ where: { id } });
        }
        catch(err){
          return({
            message:err
          })
        }
       
      }


      // find by email
    
      async findByEmail(email: string) {

        try{
          return await this.userRepository.findOne({ where: { email } });
        }catch(err){
          return ({
            message:err,
          });
        }
       
      }
    

      // delete user by id
     async delete(userId: number) {
      try{
        return await this.userRepository.delete(userId);
      }catch(err){
        return({
          message:err
        })
      }
        
      }
}
