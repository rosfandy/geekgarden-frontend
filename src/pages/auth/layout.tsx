interface Props {
    children: JSX.Element;
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            {children}
        </div>
    )
}