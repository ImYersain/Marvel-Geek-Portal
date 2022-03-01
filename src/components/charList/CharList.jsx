import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }
    marvelService = new MarvelService();
    onError = () => {
        this.setState({error: true, loading: false})
    }
    onCharListLoaded = (charList) => {
        this.setState({charList, loading: false, error: false})

    }
    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
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


    render(){
        let {charList, error, loading} = this.state;
        let items = this.onRender(charList);
        const spinner = loading? <Spinner />: null;
        const errorMessage = error? <ErrorMessage />:null;
        const content = !(loading || error)? items: null;

        return (
            <div className="char__list">
                
                {spinner}
                {errorMessage}
                {content}
    
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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