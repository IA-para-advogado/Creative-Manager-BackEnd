import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private service: AuthService = new AuthService();

  async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const data = await this.service.signIn(email, password);

    res.json({ success: true, data });
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const { name, email, phone, avatar_url, role, password, confirmPassword } = req.body;

    const data = await this.service.signUp(
      { name, email, phone, avatar_url, role },
      password,
      confirmPassword
    );

    res.status(201).json({ success: true, data });
  }

  async signOut(req: Request, res: Response): Promise<void> {
    await this.service.signOut();
    res.json({ success: true, message: "Sessão encerrada" });
  }
  async resetPasswordRequest(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    await this.service.resetPasswordRequest(email);
    res.json({ success: true, message: "E-mail de recuperação enviado" });
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { password, access_token, refresh_token} = req.body; // Adicionado refresh_token
    
    // Passando os 3 dados para o Service
    await this.service.resetPassword(password, access_token, refresh_token);
    
    res.json({ success: true, message: "Senha redefinida com sucesso" });
  }
}