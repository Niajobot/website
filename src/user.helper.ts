import firebase from "firebase";
import { UserModel } from "@/models/user.model";

export class UserHelper {
    public static isStreamerOfChannel(user: UserModel, streamer: string): boolean {
        return user?.twitchName === streamer;
    }

    public static async getUserTwitchName(userId?: string): Promise<string | null> {
        if (userId != null) {
            const value = await firebase
                .database()
                .ref("/users")
                .orderByKey()
                .equalTo(userId)
                .get();
            if (value.val() != null) {
                return value.val()[userId];
            }
        }
        return null;
    }
}