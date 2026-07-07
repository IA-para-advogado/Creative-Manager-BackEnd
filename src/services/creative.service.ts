import { CreativeRepository } from '../repositories/creative.repository';
import { IDashboardStats } from '../models/creative.model';
import { ServiceResponse } from '../errors/ServiceResponse';

export class CreativeService {
  private creativeRepository: CreativeRepository;

  constructor() {
    this.creativeRepository = new CreativeRepository();
  }

  async getDashboardData(): Promise<ServiceResponse<IDashboardStats>> {
    try {
      const creatives = await this.creativeRepository.getAllCreatives();

      let totalSpend = 0;
      let totalRevenue = 0;
      let topCreative = creatives[0] || null;

      creatives.forEach(c => {
        totalSpend += c.spend;
        totalRevenue += c.revenue;

        // Descobre qual criativo performou melhor baseado em conversões
        if (topCreative && c.conversions > topCreative.conversions) {
          topCreative = c;
        }
      });

      // Cálculo do ROI (Retorno sobre o Investimento)
      const roi = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend) * 100 : 0;

      // 🤖 Placeholder para a futura implementação de IA
      const aiInsights = "Análise da IA: Seu criativo principal está performando acima da média. Sugerimos aumentar o orçamento em 15%.";

      return {
        success: true,
        status: 200,
        data: {
          totalSpend,
          totalRevenue,
          roi: Number(roi.toFixed(2)),
          topCreative,
          aiInsights,
        },
      };
    } catch (error) {
      console.error('[CreativeService] getDashboardData error', error);
      return { success: false, status: 500, message: 'Erro ao gerar estatísticas do dashboard' };
    }
  }
}