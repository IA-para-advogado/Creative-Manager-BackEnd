import { supabase } from "../config/supabase";


export interface ProfileModel {
  name?:       string;
  avatar_url?: string;
  role?:       string;
  email?:      string;
  phone?:      string; // 👈 adicionado
}

export class ProfileRepository{
    async findById(userId: string){
        const {data, error} = await supabase.from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if(error) throw new Error(error.message);
        return data;
    }
    async findAll(){
        const {data, error} = await supabase.from('profiles')
            .select('*');

        if(error) throw new Error(error.message);
        return data;
    }
    async delete(UserId: string){
        const {error} = await supabase.from('profiles')
            .delete()
            .eq('id', UserId);

        if(error) throw new Error(error.message);
    }
    async update(userId: string, updates: ProfileModel){
        const {data, error} = await supabase.from('profiles')
            .update(updates)
            .eq('id', userId)
            .select('*')
            .single();

        if(error) throw new Error(error.message);
        return data;
    }

}