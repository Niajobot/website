export class GameModel {

    public constructor(sug : Partial<GameModel>) {
        Object.assign(this, sug)
    }

    public id: string;
    public game: string;
    public original_suggesting_author: string;
    public status: string;
}