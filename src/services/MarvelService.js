class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public'; 
    _apiKey = 'apikey=772a6ac61af132f4df61eca7fcdef5b1';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transfromCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transfromCharacter(res.data.results[0]);
    }
    _transfromCharacter = (char) => {
        return {
            id: char.id,
            name : char.name,
            description : char.description,
            thumbnail : char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage : char.urls[0].url,    
            wiki : char.urls[1].url,
            comics: char.comics.items.slice(0,10)
        }
    }
}


export default MarvelService;