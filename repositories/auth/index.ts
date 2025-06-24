import UserModel from '../../models/user';
import { RegisterTypes, UserTypes } from '../../dto/user';
import { comparePassword, hashedPassword } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

/*---> Function to handle user registration (SignUp) <---*/
export const SignUpRepository = async (userData: RegisterTypes) => {
    const { name, phone, password } = userData;

    try {
        const existingAccount = await UserModel.findOne({ phone });
        if (existingAccount) {
            return { token: null, message: "Phone number is already in use." };
        }

        const hashed = await hashedPassword(password);
        const newUser = new UserModel({
            name: name,
            phone: phone,
            password: hashed,
            profilePic: "",
            bio: "",
            isOnline: false,
            lastSeen: new Date(),
            contacts: [],
        });
        await newUser.save();

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined.");
        }

        const token = generateToken({ id: newUser._id, phone: newUser.phone });
        if (token) {
            return {
                token: token,
                message: "Account has been created!",
                data: {
                    id: newUser._id,
                    name: newUser.name,
                    phone: newUser.phone,
                }
            }
        }
        return { token: null, message: "Failed to generate token" };
    } catch (error) {
        console.error("Error during account creation:", error);
        return { token: null, message: `Account creation failed: ${error}` };
    }
};


/*---> Function to handle user login (SignIn) <---*/
export const SignInRepository = async (userData: { phone: string; password: string }) => {
    const { phone, password } = userData;

    try {
        const user: UserTypes | null = await UserModel.findOne({ phone });
        if (!user) {
            return { token: null, message: "No account found with this phone number." };
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return { token: null, message: "Incorrect password." };
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined.");
        }

        const token = generateToken({ id: user.id, phone: user.phone });
        if (token) {
            return {
                token: token,
                message: "Login successful!",
                data: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                }
            }
        }
        return { token: null, message: "Failed to generate token" };
    } catch (error) {
        console.error("Error during login:", error);
        return { token: null, message: `Login failed: ${error}` };
    }
};