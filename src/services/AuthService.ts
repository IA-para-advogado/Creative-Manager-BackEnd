import { AuthRepository } from "../repositories/AuthRepository";
import { ProfileModel } from "../repositories/ProfileRepository";
import { AppError } from "../errors/AppError";
import { AuthApiError, AuthError } from "@supabase/supabase-js";

export class AuthService {
    private authRepo: AuthRepository = new AuthRepository();

    async signIn(email: string, password: string) {
        if (!email || !password) {
            throw new AppError("E-mail e senha são obrigatórios");
        }

        try {
            const data = await this.authRepo.signInWithEmail(email, password);

            return {
                user: data.user,
                access_token: data.session?.access_token,
                expires_at: data.session?.expires_at,
            };
        } catch (error) {
            const errorMessage = String(error);

            if (errorMessage.includes("Invalid login credentials"))
                throw new AppError("E-mail ou senha inválidos", 401);

            if (errorMessage.includes("Email not confirmed"))
                throw new AppError("Seu e-mail ainda não foi confirmado", 401);

            throw new AppError("Erro interno no servidor", 500);
        }
    }

    async signUp(
        profile: ProfileModel,
        password: string,
        confirmPassword: string, // 👈 novo parâmetro
    ) {
        if (!profile.email || !password) {
            throw new AppError("E-mail e senha são obrigatórios");
        }

        if (password.length < 6) {
            throw new AppError("A senha deve ter no mínimo 6 caracteres");
        }

        if (password !== confirmPassword) {
            throw new AppError("As senhas não coincidem");
        }

        const data = await this.authRepo.signUp(profile, password);

        return {
            user: data.user,
            message:
                "Cadastro realizado! Verifique seu e-mail para confirmar a conta.",
        };
    }

    async signOut() {
        await this.authRepo.signOut();
    }

    async resetPasswordRequest(email: string) {
        if (!email) throw new AppError("E-mail é obrigatório");
        await this.authRepo.resetPasswordRequest(email);
    }

    async resetPassword(
        newPassword: string,
        accessToken: string,
        refreshToken: string,
    ) {
        if (!newPassword || !accessToken) {
            throw new AppError("Nova senha e token são obrigatórios");
        }
        if (newPassword.length < 6) {
            throw new AppError("A senha deve ter no mínimo 6 caracteres");
        }
        await this.authRepo.resetPassword(
            newPassword,
            accessToken,
            refreshToken,
        );
    }
}
