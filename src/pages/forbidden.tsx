import { useNavigate } from 'react-router-dom';
import illust from '../assets/403.svg'
export function Forbidden() {
    const navigate = useNavigate();
    const handleBack = () => {
        return window.history.state ? navigate(-1) : navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 py-8 ">
            <img src={illust} className="logo w-auto h-64" alt="Vite logo" />
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-medium text-center">You are not authorized</h1>
                <p className="text-xl text-gray-600 text-center">
                    You tried to access a page you did not have prior authorization for.
                </p>
                <button onClick={(handleBack)} className='bg-blue-500 px-8 py-2 rounded text-white hover:bg-blue-600'>Back</button>
            </div>
        </div>
    )
}
