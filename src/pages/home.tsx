import { Link } from "react-router-dom";
import { TypewriterEffectComponent } from "../components/Typewritter";

export function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex justify-between py-8 lg:px-64 md:px-12 px-4">
                <div className="text-4xl font-handwriting">{':> catalogue.'}</div>
                <Link to="/register" className="bg-black px-4 py-2 rounded-xl text-white text-sm">Join now</Link>
            </div>
            <TypewriterEffectComponent />
        </div>
    )
}