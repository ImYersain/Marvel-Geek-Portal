import { useState } from 'react';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';
import CharSearchForm from '../charSearchForm/CharSearchForm';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBoundry>
                <RandomChar />
            </ErrorBoundry>
            <div className="char__content">
                <ErrorBoundry>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundry>
                <div>
                    <ErrorBoundry>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundry>
                    <ErrorBoundry>
                        <CharSearchForm />
                    </ErrorBoundry>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;