import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundry from '../errorBoundary/ErrorBoundary';


const ComicsPage = () => {

    return (
        <>
            <ErrorBoundry>
                <AppBanner />
                <ComicsList />
            </ErrorBoundry>
        </>
    )
}

export default ComicsPage;