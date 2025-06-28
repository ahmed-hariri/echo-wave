import { ObjectId } from "mongoose";

/**
 * Interface for user login data
 */
export interface LoginTypes {
    phone: string;
    password: string;
}

/**
 * Interface for user registration data
 * Extends LoginTypes by adding a name field
 */
export interface RegisterTypes extends LoginTypes {
    name: string;
}

/**
 * Interface representing a user in the system
 */
export interface UserTypes {
    id?: ObjectId;         // Optional unique identifier from MongoDB
    name: string;          // User's full name
    phone: string;         // User's phone number
    password: string;      // Hashed password
    profilePic: string;    // URL or path to profile picture
    bio: string;           // User biography or description
    isOnline: boolean;     // Online status
    lastSeen: Date;        // Timestamp of last activity
    contacts: string[];    // List of contact IDs (phone numbers or user IDs)
}