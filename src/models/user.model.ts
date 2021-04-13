export class UserModel {

    public constructor(sug : Partial<UserModel>) {
        Object.assign(this, sug)
    }

    public email?: string | null;
    public twitchName?: string | null;
}