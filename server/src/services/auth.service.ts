import bcrypt from 'bcryptjs';
import * as userRepository from '../repositories/user.repository';
import { RegisterInput, LoginInput } from '../dto/auth/auth.dto';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { IUser } from '../models/user.model';

const generateTokens = async (user: IUser) => {
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  await userRepository.updateRefreshToken(user._id.toString(), refreshToken);

  const userObj = user.toJSON();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

export const register = async (data: RegisterInput) => {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new AppError('Email already in use', 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = await userRepository.create({
    ...data,
    password: hashedPassword,
  });

  return generateTokens(user);
};

export const login = async (data: LoginInput) => {
  const user = await userRepository.findByEmail(data.email, true);
  if (!user || !user.password) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  return generateTokens(user);
};

export const refreshTokens = async (currentRefreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(currentRefreshToken);
    const user = await userRepository.findById(decoded.userId);

    if (!user || user.refreshToken !== currentRefreshToken) {
      throw new AppError('Invalid refresh token', 401);
    }

    return generateTokens(user);
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
};

export const logout = async (userId: string) => {
  await userRepository.updateRefreshToken(userId, null);
};
