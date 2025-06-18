import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../../models/user';
import { AuthTypes, UserTypes } from '../../dto/user';

/*---> Function to handle user registration (SignUp) <---*/
export const SignUpRepository = async (userData: AuthTypes) => {
    const { name, phone, password } = userData;

    try {
        const existingAccount = await UserModel.findOne({ phone });
        if (existingAccount) {
            return { token: null, message: "Phone number is already in use." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name: name,
            phone: phone,
            password: hashedPassword,
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

        const token = jwt.sign(
            { id: newUser._id, phone: newUser.phone },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );
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

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { token: null, message: "Incorrect password." };
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined.");
        }

        const token = jwt.sign(
            { id: user._id, phone: user.phone },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        if (token) {
            return {
                token: token,
                message: "Login successful!",
                data: {
                    id: user._id,
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