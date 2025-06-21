export interface LoginTypes {
    phone: string;
    password: string;
}

export interface RegisterTypes extends LoginTypes {
    name: string;
}

export interface UserTypes {
    id?: string;
    name: string;
    phone: string;
    password: string;
    profilePic: string;
    bio: string;
    isOnline: boolean;
    lastSeen: Date;
    contacts: string[];
}