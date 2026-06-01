import { supabase } from "../config/supabase";
import { ProfileModel } from "./ProfileRepository";

export class AuthRepository {
  // futuramente, para autenticação com Google
//   async signInWithGoogle() {
//     const { data, error } = await this.supabase.auth.signInWithOAuth({
//       provider: 'google',
//     });
//     if (error) {
//       throw new Error(`Erro ao autenticar com Google: ${error.message}`);
//     }
//     return data;
//   }

    async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(`Erro ao autenticar: ${error.message}`);
    }
    return data;
  }

  async signUp(profile: ProfileModel, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: profile.email!,
      password,
      options: {
        data: {
          name: profile.name,
          avatar_url: profile.avatar_url,
          role: profile.role,
          phone: profile.phone,
        },
      },
    });
    if (error) {
      throw new Error(`Erro ao registrar: ${error.message}`);
    }
    return data;
  }
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`Erro ao deslogar: ${error.message}`);
    }
  }
}