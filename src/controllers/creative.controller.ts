import { Request, Response, NextFunction } from 'express';
import { CreativeService } from '../services/creative.service';

export class CreativeController {
  private creativeService: CreativeService;

  constructor() {
    this.creativeService = new CreativeService();
  }

  // Método que será chamado pela rota do dashboard
  getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.creativeService.getDashboardData();
      res.status(result.status || 200).json(result);
    } catch (error) {
      next(error); // Encaminha o erro para o middleware de erro global
    }
  };
}