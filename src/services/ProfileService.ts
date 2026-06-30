import { ProfileRepository, ProfileModel } from "../repositories/ProfileRepository";
import { AppError } from "../errors/AppError";
import { ServiceResponse } from "../errors/ServiceResponse";

export class ProfileService{
    private profileRepo: ProfileRepository = new ProfileRepository();

    async getProfileById(userId: string): Promise<ServiceResponse<ProfileModel>>{
        try{
            const profile = await this.profileRepo.findById(userId);
            if(!profile) return { success: false, status: 404, message: 'Perfil não encontrado' };
            return { success: true, status: 200, data: profile };
        }catch(error){
            return { success: false, status: 500, message: 'Erro ao buscar perfil' };
        }
    }
    async getAllProfiles(): Promise<ServiceResponse<ProfileModel[]>>{
        try{
            const profiles = await this.profileRepo.findAll();
            return { success: true, status: 200, data: profiles };
        }catch(error){
            return { success: false, status: 500, message: 'Erro ao listar perfis' };
        }
    }
    async deleteProfileById(userId: string): Promise<ServiceResponse>{
        try{
            await this.profileRepo.delete(userId);
            return { success: true, status: 200, message: 'Perfil deletado com sucesso' };
        }catch(error){
            return { success: false, status: 500, message: 'Erro ao deletar perfil' };
        }
    }
    async updateProfileById(userId: string, updates: Partial<ProfileModel>): Promise<ServiceResponse<ProfileModel>>{
        try{
            const updatedProfile = await this.profileRepo.update(userId, updates);
            if(!updatedProfile) return { success: false, status: 500, message: 'Erro ao atualizar perfil' };
            return { success: true, status: 200, data: updatedProfile };
        }catch(error){
            return { success: false, status: 500, message: 'Erro ao atualizar perfil' };
        }
    }
    async me(userId: string): Promise<ServiceResponse<ProfileModel>>{
        return await this.getProfileById(userId);
    }   
}