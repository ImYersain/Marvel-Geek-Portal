import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public'; 
    const _apiKey = 'apikey=772a6ac61af132f4df61eca7fcdef5b1';
    const _baseOffset = 210;



 
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transfromCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transfromCharacter(res.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transfromCharacter);
    }

    const _transfromCharacter = (char) => {
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

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transfromComics);
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _transfromComics(res.data.results[0]);
    }

    const _transfromComics = (com) => {
        return {
            id: com.id,
            title : com.title,
            price : com.prices[1],
            thumbnail: com.thumbnail.path + '.' + com.thumbnail.extension,
            homepage : com.urls[0].url
        }
    }


    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getCharacterByName, getComic}
}


export default useMarvelService;