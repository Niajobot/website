export class SuggestionModel {

    public constructor(sug : Partial<SuggestionModel>) {
        Object.assign(this, sug)
    }

    public id: string;
    public game: string;
    public author: string;
}