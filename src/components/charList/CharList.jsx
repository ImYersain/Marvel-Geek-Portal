import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

import './charList.scss';


const CharList = () => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
    
    const marvelService = new MarvelService();
    
    useEffect(() => {
        onRequest();
    }, []) 
    
    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);

        // this.setState({
        //     newItemLoading: true
        // })
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        } 

        this.setState(({charList, offset}) => ({
            charList : [...charList, ...newCharList], 
            loading: false, 
            error: false, 
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        })
        )

        setCharList(charList =>[...charList, ...newCharList]);
        setLoading(false);
        setError(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }
    
    
    const onError = () => {
        setError(true);
        setLoading(false);
        
        this.setState({error: true, loading: false})
    }
    
    
    
    


    onRender(arr) {
        let item = arr.map(i => {
            let imgStyle = {'objectFit':  'cover'};
            if(i.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit': 'unset'};
        }
            return (
                <li className="char__item" key={i.id}
                onClick={() => this.props.onCharSelected(i.id)}>
                    <img src={i.thumbnail} alt={i.name} style={imgStyle}/>
                     <div className="char__name">{i.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {item}
            </ul>
        )
    }


    
    let {charList, error, loading, offset, newItemLoading, charEnded} = this.state;
    let items = this.onRender(charList);
    const spinner = loading? <Spinner />: null;
    const errorMessage = error? <ErrorMessage />:null;
    const content = !(loading || error)? items: null;

    return (
        <div className="char__list">
            
            {spinner}
            {errorMessage}
            {content}

            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => this.onRequest(offset)}
                style={{display: charEnded?'none':'block'}}>
                
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList; 





























// import {Component} from 'react';
// import mjolnir from '../../resources/img/mjolnir.png';
// import MarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import './charList.scss';


// class CharList extends Component{
//     state = {
//         charList : [],
//         loading: true,
//         error: false,
//     } 

//     marvelService = new MarvelService()

//     onCharListLoaded = (charList) => {
//         this.setState({charList, loading: false})
//     }
//     onError = () => {
//         this.setState({loading: false, error: true})
//     }
//     componentDidMount() {
//         this.marvelService.getAllCharacters()
//             .then(this.onCharListLoaded)
//             .catch(this.onError)
//     }

//     renderItems = (arr) => {
//         let item = arr.map(item => {
            
//             return (
//                 <li className="char__item" key={item.id}>
//                     <img src={item.thumbnail} alt={item.name} />
//                     <div className="char__name">{item.name}</div>
//                 </li>
//             )
//             })
//     }

//     render(){

//     }
// }


// export default CharList;