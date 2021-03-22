export class SuggestionModel {

    public constructor(sug : Partial<SuggestionModel>) {
        Object.assign(this, sug)
    }

    public game: string;
    public author: string;
}