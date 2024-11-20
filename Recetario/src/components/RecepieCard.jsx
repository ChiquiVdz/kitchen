import { useNavigate } from "react-router-dom"

export function RecepieCard({recepie}) {

    const navigate = useNavigate()

    return (
        <div 
        className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
        style={{background: "black"}}
        onClick={() => {
            navigate('/recepies/' + recepie.id)
        }}
        >
                <h1 className="font-bold uppercase">{recepie.title}</h1>
                <p className="text-slate-400">{recepie.description}</p>
                <hr />
            </div>
    )
}