import { env } from "../config/env";
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
        emailRedirectTo: `${env.frontendUrl}/auth/confirmed`
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
  async resetPasswordRequest(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: env.frontendUrl + '/auth/resetpassword',
    });
    if (error) {
      throw new Error(`Erro ao solicitar recuperação: ${error.message}`);
    }
  }

  async resetPassword(newPassword: string, accessToken: string, refreshToken: string) {

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (sessionError) {
      throw new Error(`Token inválido: ${sessionError.message}`);
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw new Error(`Erro ao redefinir senha: ${error.message}`);
    }
  }
}