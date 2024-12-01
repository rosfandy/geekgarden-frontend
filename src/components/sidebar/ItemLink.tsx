import { Link } from "react-router-dom";
import { getRolesFromToken } from "../../../lib/jwt";

interface Props {
    icon: string;
    text: string;
    path: string;
    isActive: boolean;
    isAdmin: boolean;
}

export default function ItemLink({ text, path, isActive, isAdmin, icon }: Props) {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;
    const roles = getRolesFromToken(token);
    const userIsAdmin = roles && roles.some(role => role === 'Admin');

    if (isAdmin !== userIsAdmin && !userIsAdmin) return null;

    return (
        <Link to={path.toLowerCase()}
            className={`${isActive ? 'text-white bg-orange-500' : 'text-gray-500'} 
                        px-4 py-2 rounded-md w-[12em] duration-300 transition hover:bg-orange-500 hover:text-white`}
        >
            <div className="flex gap-x-2 items-center">
                <i className={`fa-solid ${icon} text-lg`}></i>
                {text}
            </div>
        </Link>
    );
}