import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body);
  setCookies(res, accessToken, refreshToken);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: { user },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);
  setCookies(res, accessToken, refreshToken);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { user },
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError('No refresh token provided', 401);
  }

  const result = await authService.refreshTokens(refreshToken);
  setCookies(res, result.accessToken, result.refreshToken);

  res.status(200).json({
    success: true,
    message: 'Tokens refreshed successfully',
    data: { user: result.user },
  });
});

export const logoutHandler = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    await authService.logout(req.user._id.toString());
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
