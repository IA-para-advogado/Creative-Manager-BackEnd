import { Request, Response } from 'express';
import { ProfileService } from '../services/ProfileService';

export class ProfileController {
  private service = new ProfileService();

  async me(req: Request, res: Response): Promise<void> {
    const data = await this.service.me(req.userId!);
    res.json({ success: true, data });
  }

  async show(req: Request, res: Response): Promise<void> {
    const data = await this.service.getProfileById(req.params.id);
    res.json({ success: true, data });
  }

  async update(req: Request, res: Response): Promise<void> {
    const data = await this.service.updateProfileById(req.userId!, req.body);
    res.json({ success: true, data });
  }
  async delete(req: Request, res: Response): Promise<void> {
    await this.service.deleteProfileById(req.userId!);
    res.json({ success: true, message: 'Perfil deletado com sucesso' });
  }
}