import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AppError } from '../errors/AppError';

// Extende o tipo do Request para carregar o userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new AppError('Token não informado', 401);

  // Valida o JWT diretamente no Supabase
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) throw new AppError('Token inválido ou expirado', 401);

  req.userId = data.user.id;
  next();
}