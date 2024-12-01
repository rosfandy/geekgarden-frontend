import { useLocation } from "react-router-dom";
import ItemLink from "./ItemLink";

export default function Sidebar() {
    const location = useLocation();

    const links = [
        { text: "Dashboard", path: "/dashboard", isAdmin: false, icon: 'fa-house' },
        { text: "Products", path: "/products", isAdmin: true, icon: 'fa-bag-shopping' },
        { text: "Users", path: "/users", isAdmin: true, icon: 'fa-users' },
        { text: "Profile", path: "/profile", isAdmin: false, icon: 'fa-user' },
    ];

    return (
        <div className="bg-white border-r min-h-screen p-4">
            <div className="text-2xl font-handwriting mb-8">{':> catalogue.'}</div>
            <div className="mt-4">
                <span className="text-sm text-gray-400">Main Menu</span>
                <div className="flex flex-col gap-y-4 mt-2 text-sm">
                    {links.map(link => (
                        <ItemLink
                            path={link.path}
                            text={link.text}
                            isAdmin={link.isAdmin}
                            icon={link.icon}
                            isActive={location.pathname === link.path}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}