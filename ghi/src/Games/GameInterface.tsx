export interface Game {
    name: string,
    publisher: string,
    min_players: number,
    max_players: number,
    min_game_length: number,
    max_game_length: number,
    genre: string,
    picture_url: string[],
    websites: string[],
    theming: string[],
    rules: string,
    formats: string[],
    bgg_rating: number,
    ratings: number[],
    comments: string[],
    game_mechanics: string[],
    description: string
    created: {},
    updated: {},
    id: string
}