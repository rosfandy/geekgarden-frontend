import Sidebar from "../../components/sidebar/Sidebar";

interface Props {
    children: JSX.Element;
}

export default function Layout({ children }: Props) {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    )
}