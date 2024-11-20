import { useEffect, useState } from "react"
import { getAllRecepies } from "../api/recepies.api"
import { RecepieCard } from "./RecepieCard";

export function RecepiesList() {

    const [recepies, setRecepies] = useState([]);

    useEffect(() => {

        async function loadRecepies() {
            const res = await getAllRecepies();
            setRecepies(res.data);
        }

        loadRecepies();

    }, [])  

    return <div className="grid grid-cols-3 gap-3">
        {recepies.map(recepie => (
            <RecepieCard key={recepie.id} recepie={recepie}/>
        ))}
    </div>
}