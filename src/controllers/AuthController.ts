import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private service: AuthService = new AuthService();

  async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const result = await this.service.signIn(email, password);
    res.status(result.status || 200).json(result);
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const { name, email, phone, avatar_url, role, password, confirmPassword } = req.body;
    const result = await this.service.signUp(
      { name, email, phone, avatar_url, role },
      password,
      confirmPassword
    );

    res.status(result.status || 201).json(result);
  }

  async signOut(req: Request, res: Response): Promise<void> {
    const result = await this.service.signOut();
    res.status(result.status || 200).json(result);
  }
  async resetPasswordRequest(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const result = await this.service.resetPasswordRequest(email);
    res.status(result.status || 200).json(result);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { password, access_token, refresh_token} = req.body; // Adicionado refresh_token
    
    // Passando os 3 dados para o Service
    const result = await this.service.resetPassword(password, access_token, refresh_token);
    res.status(result.status || 200).json(result);
  }
}