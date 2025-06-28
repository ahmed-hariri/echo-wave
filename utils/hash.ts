import bcrypt from 'bcrypt';

/* ---> Hash a plain text password function <--- */
export const hashedPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
}

/* ---> Compare a plain password with a hashed password function <--- */
export const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};