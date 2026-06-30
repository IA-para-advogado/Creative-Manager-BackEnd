import { Request, Response } from 'express';
import { ProfileService } from '../services/ProfileService';

export class ProfileController {
  private service = new ProfileService();

  async me(req: Request, res: Response): Promise<void> {
    const result = await this.service.me(req.userId!);
    res.status(result.status || 200).json(result);
  }

  async show(req: Request, res: Response): Promise<void> {
    const result = await this.service.getProfileById(req.params.id);
    res.status(result.status || 200).json(result);
  }

  async update(req: Request, res: Response): Promise<void> {
    const result = await this.service.updateProfileById(req.userId!, req.body);
    res.status(result.status || 200).json(result);
  }
  async delete(req: Request, res: Response): Promise<void> {
    const result = await this.service.deleteProfileById(req.userId!);
    res.status(result.status || 200).json(result);
  }
}