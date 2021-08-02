import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    user.password = await this.hashPassword(createUserDto.password);
    const savedUser = await user.save();
    return savedUser;
  }

  async hashPassword(password: string) {
    return await hash(password, 8);
  }

  async comparePassword(plainTextPassword: string, hash: string) {
    return await compare(plainTextPassword, hash);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async nuke() {
    return await this.userModel.deleteMany();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
