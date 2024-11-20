import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <div className="flex justify-between py-3">
            <Link to="/recepies">
                <h1 className="font-bold text-3xl mb-4">Recepies App</h1>
            </Link>
            <Link to="/recepie-create">
                <button className="bg-indigo-500 px-3 py-2 rounded-lg">Create Recepie</button>
            </Link>
        </div>
    )
}