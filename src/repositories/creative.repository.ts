import { supabase } from '../config/supabase';
import { ICreative } from '../models/creative.model';

export class CreativeRepository {
  // Busca todos os criativos do Supabase
  async getAllCreatives(): Promise<ICreative[]> {
    const { data, error } = await supabase
      .from('creatives')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar criativos: ${error.message}`);
    }

    return data as ICreative[];
  }
}