import { ProfileRepository, ProfileModel } from "../repositories/ProfileRepository";
import { AppError } from "../errors/AppError";

export class ProfileService{
    private profileRepo: ProfileRepository = new ProfileRepository();

    async getProfileById(userId: string){
        const profile = await this.profileRepo.findById(userId);
        if(!profile) throw new AppError('Perfil não encontrado', 404);
        return profile;
    }
    async getAllProfiles(){
        return await this.profileRepo.findAll();
    }
    async deleteProfileById(userId: string){
        await this.profileRepo.delete(userId);
    }
    async updateProfileById(userId: string, updates: Partial<ProfileModel>){
        const updatedProfile = await this.profileRepo.update(userId, updates);
        if(!updatedProfile) throw new AppError('Erro ao atualizar perfil', 500);
        return updatedProfile;
    }
    async me(userId: string){
        return await this.getProfileById(userId);
    }   
}