import { Link } from "react-router-dom";
import RegisterForm from "../../../components/form/RegisterForm";
import AuthLayout from "../layout";

export function Register() {
    const baseUri = process.env.VITE_API_URL
    const path = baseUri + "/api/auth/register"

    return (
        <AuthLayout>
            <div className="flex items-center">
                <div className="bg-white py-12 px-8 rounded-md shadow-sm border">
                    <Link to={"/"} className="text-4xl font-handwriting">catalogue.</Link>
                    <div className="mt-4">
                        <p className="font-semibold text-gray-500 mb-4">Register your account</p>
                        <RegisterForm path={path} />
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}