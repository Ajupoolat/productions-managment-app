import bcrypt from 'bcryptjs';
import * as userRepository from '../repositories/user.repository';
import { RegisterInput, LoginInput } from '../dto/auth/auth.dto';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { IUser } from '../models/user.model';

const sanitizeUser = (user: IUser) => {
  const userObj = user.toJSON();

  delete userObj.password;
  delete userObj.refreshToken;

  return userObj;
};

const generateTokens = async (user: IUser) => {
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await userRepository.updateRefreshTokenHash(
    user._id.toString(),
    hashedRefreshToken
  );

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
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

  return {
    user: sanitizeUser(user),
  };
};

export const login = async (data: LoginInput) => {
  console.log('the request reach in auth service:',data)
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

    if (!user || !user.refreshTokenHash) {
      throw new AppError('Invalid refresh token', 401);
    }

    const isValid = await bcrypt.compare(
      currentRefreshToken,
      user.refreshTokenHash
    );

    if (!isValid) {
      throw new AppError('Invalid refresh token', 401);
    }

    return generateTokens(user);
  } catch {
    throw new AppError('Invalid refresh token', 401);
  }
};

export const logout = async (userId: string) => {
  await userRepository.updateRefreshTokenHash(userId, null);
};