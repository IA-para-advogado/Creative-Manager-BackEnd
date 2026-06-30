import { AuthRepository } from "../repositories/AuthRepository";
import { ProfileModel } from "../repositories/ProfileRepository";
import { ServiceResponse } from "../errors/ServiceResponse";

export class AuthService {
    private authRepo: AuthRepository = new AuthRepository();

    async signIn(email: string, password: string): Promise<ServiceResponse> {
        if (!email || !password) {
            return { success: false, status: 400, message: "E-mail e senha são obrigatórios" };
        }

        try {
            const data = await this.authRepo.signInWithEmail(email, password);

            return {
                success: true,
                status: 200,
                data: {
                    user: data.user,
                    access_token: data.session?.access_token,
                    expires_at: data.session?.expires_at,
                },
            };
        } catch (error) {
            console.error('[AuthService] signIn error', error);
            const errorMessage = String(error);

            if (errorMessage.includes("Invalid login credentials"))
                return { success: false, status: 401, message: "E-mail ou senha inválidos" };

            if (errorMessage.includes("Email not confirmed"))
                return { success: false, status: 401, message: "Seu e-mail ainda não foi confirmado" };

            return { success: false, status: 500, message: "Erro ao autenticar usuário" };
        }
    }

    async signUp(
        profile: ProfileModel,
        password: string,
        confirmPassword: string, // 👈 novo parâmetro
    ): Promise<ServiceResponse> {
        if (!profile.email || !password) {
            return { success: false, status: 400, message: "E-mail e senha são obrigatórios" };
        }

        if (password.length < 6) {
            return { success: false, status: 400, message: "A senha deve ter no mínimo 6 caracteres" };
        }

        if (password !== confirmPassword) {
            return { success: false, status: 400, message: "As senhas não coincidem" };
        }

        try {
            const data = await this.authRepo.signUp(profile, password);

            return {
                success: true,
                status: 201,
                data: {
                    user: data.user,
                },
                message: "Cadastro realizado! Verifique seu e-mail para confirmar a conta.",
            };
        } catch (error) {
            console.error('[AuthService] signUp error', error);
            return { success: false, status: 500, message: "Erro ao cadastrar usuário" };
        }
    }

    async signOut(): Promise<ServiceResponse> {
        try {
            await this.authRepo.signOut();
            return { success: true, status: 200, message: "Sessão encerrada" };
        } catch (error) {
            return { success: false, status: 500, message: "Erro ao encerrar sessão" };
        }
    }

    async resetPasswordRequest(email: string): Promise<ServiceResponse> {
        if (!email) return { success: false, status: 400, message: "E-mail é obrigatório" };

        try {
            await this.authRepo.resetPasswordRequest(email);
            return { success: true, status: 200, message: "E-mail de recuperação enviado" };
        } catch (error) {
            console.error('[AuthService] resetPasswordRequest error', error);
            return { success: false, status: 500, message: "Erro ao solicitar recuperação de senha" };
        }
    }

    async resetPassword(
        newPassword: string,
        accessToken: string,
        refreshToken: string,
    ): Promise<ServiceResponse> {
        if (!newPassword || !accessToken) {
            return { success: false, status: 400, message: "Nova senha e token são obrigatórios" };
        }
        if (newPassword.length < 6) {
            return { success: false, status: 400, message: "A senha deve ter no mínimo 6 caracteres" };
        }

        try {
            await this.authRepo.resetPassword(
                newPassword,
                accessToken,
                refreshToken,
            );
            return { success: true, status: 200, message: "Senha redefinida com sucesso" };
        } catch (error) {
            console.error('[AuthService] resetPassword error', error);
            return { success: false, status: 500, message: "Erro ao redefinir senha" };
        }
    }
}
