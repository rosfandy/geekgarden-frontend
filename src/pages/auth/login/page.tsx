import { Link } from "react-router-dom";
import LoginForm from "../../../components/form/LoginForm";
import AuthLayout from "../layout";

export function Login() {
    const baseUri = process.env.VITE_API_URL
    const path = baseUri + "/api/auth/login"

    return (
        <AuthLayout>
            <div className="flex items-center">
                <div className="bg-white py-12 px-8 rounded-md shadow-sm border">
                    <Link to="/" className="text-4xl font-handwriting">catalogue.</Link>
                    <div className="mt-4">
                        <p className="font-semibold text-gray-500 mb-4">Login to your account</p>
                        <LoginForm path={path} />
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}