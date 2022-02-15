import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} style={{display: 'block', margin: '0 auto', width: '250px', height: '250px', objectFit: 'contain'}} alt="Error" />
    )
}

export default ErrorMessage;