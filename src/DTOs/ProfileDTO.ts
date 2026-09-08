export class ProfileDTO {
    id:         string;
    name:       string;
    avatar_url: string;
    phone?:     string; 

    constructor(data: any) {
        this.id         = data.id;
        this.name       = data.name;
        this.avatar_url = data.avatar_url;
        this.phone      = data.phone; 
    }
}    
