
export interface AuthTypes {
    name: string;
    phone: string;
    password: string;
}

export interface UserTypes {
    _id?: string;
    name: string;
    phone: string;
    password: string;
    profilePic: string;
    bio: string;
    isOnline: boolean;
    lastSeen: Date;
    contacts: string[];
}