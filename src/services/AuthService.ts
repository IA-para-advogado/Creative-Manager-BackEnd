import { AuthRepository } from "../repositories/AuthRepository";
import { ProfileModel } from "../repositories/ProfileRepository";
import { AppError } from "../errors/AppError";

export class AuthService {
  private authRepo: AuthRepository = new AuthRepository();

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new AppError("E-mail e senha são obrigatórios");
    }

    const data = await this.authRepo.signInWithEmail(email, password);

    return {
      user:         data.user,
      access_token: data.session?.access_token,
      expires_at:   data.session?.expires_at,
    };
  }

  async signUp(profile: ProfileModel, password: string) {
    if (!profile.email || !password) {
      throw new AppError("E-mail e senha são obrigatórios");
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres");
    }

    const data = await this.authRepo.signUp(profile, password);

    return {
      user: data.user,
    };
  }

  async signOut() {
    await this.authRepo.signOut();
  }

  async resetPasswordRequest(email: string) {
    if (!email) throw new AppError("E-mail é obrigatório");
    await this.authRepo.resetPasswordRequest(email);
  }

  async resetPassword(newPassword: string, accessToken: string) {
    if (!newPassword || !accessToken) {
      throw new AppError("Nova senha e token são obrigatórios");
    }
    if (newPassword.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres");
    }
    await this.authRepo.resetPassword(newPassword, accessToken);
  }
}