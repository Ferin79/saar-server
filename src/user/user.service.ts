import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User, UserLoginType, UserRole } from './entities/user.entity.js';
import { JwtPayload } from './types/jwt-payload.type.js';
import { SearchUsersDto } from './dto/search-users.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    console.log('existingUser', existingUser);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    console.log('createUserDto', createUserDto);

    // Create new user
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    console.log('user', user);

    // Remove password from response
    const { password, ...result } = user;

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: result,
      ...tokens,
    };
  }

  async findAll(query: SearchUsersDto) {
    const {
      search,
      role,
      page = 1,
      limit: requestedLimit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    // Enforce maximum limit of 100 users per page
    const limit = Math.min(Number(requestedLimit), 100);

    // Build where conditions
    const whereConditions: FindOptionsWhere<User> = {};

    if (search) {
      whereConditions.name = Like(`%${search}%`);
    }

    if (role) {
      whereConditions.role = Object.values(UserRole).includes(role as UserRole)
        ? (role as UserRole)
        : undefined;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    console.log('whereConditions', whereConditions);

    // Query with pagination and sorting
    const [users, total] = await this.userRepository.findAndCount({
      where: whereConditions,
      order: { [sortBy]: sortOrder },
      take: limit,
      skip,
    });

    // Remove passwords from response
    const safeUsers = users.map((user) => {
      const { password, ...result } = user;
      return result;
    });

    return {
      data: safeUsers,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string, includePassword = false) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (includePassword) {
      queryBuilder.addSelect('user.password');
    }

    return queryBuilder.getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Prevent changing email to one that already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }

    // Update user
    await this.userRepository.update(id, updateUserDto);

    // Return updated user
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);

    return { success: true, message: 'User deleted successfully' };
  }

  async login(loginDto: { email: string; password: string }) {
    // Find user with password included
    const user = await this.findByEmail(loginDto.email, true);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    if (!(await user.validatePassword(loginDto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Remove password from response
    const { password, ...result } = user;

    return {
      user: result,
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
        },
      );

      // Find user
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private async generateTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET || 'accesssecret',
        expiresIn: '15m',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
        expiresIn: '7d',
      }),
    };
  }
}
