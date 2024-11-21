import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { createRecepie, deleteRecepie, updateRecepie, getRecepie, getIngredients, createIngredient } from '../api/recepies.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function RecepieFormPage() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const params = useParams()

    const [ingredients, setIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState("")
    const [newIngredientCalories, setNewCal] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        async function loadIngredients() {
            const res = await getIngredients()
            console.log('Ingredients loaded:', res.data)
            setIngredients(res.data)
        }
        loadIngredients()

        async function loadRecepie() {
            if (params.id) {
                const res = await getRecepie(params.id)
                setValue("title", res.data.title)
                setValue("description", res.data.description)
                setValue("cooking_time", res.data.cooking_time)
                setValue("instructions", res.data.instructions)
            }
        }
        loadRecepie()
    }, [params.id, setValue])

    const onSubmit = handleSubmit(async (data) => {

        if (newIngredient) {
            const res = await createIngredient({ name: newIngredient })
            data.ingredients = [...data.ingredients, res.data.id]
        }

        data.ingredients = [...data.ingredients, ...selectedIngredients]

        if (params.id) {
            await updateRecepie(params.id, data)
            toast.success("Receta Actualizada")
        } else {
            await createRecepie(data)
            toast.success("Receta Creada")
        }

        navigate("/recepies")
    })

    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleIngredientSelect = (ingredientId) => {
        if (!selectedIngredients.includes(ingredientId)) {
            setSelectedIngredients([...selectedIngredients, ingredientId])
        }
    }

    const handleIngredientDeselect = (ingredientId) => {
        setSelectedIngredients(selectedIngredients.filter(id => id !== ingredientId))
    }

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                {errors.title && <span>this field is required</span>}

                <textarea
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    rows="3"
                    placeholder="Description"
                    {...register("description", { required: true })}
                ></textarea>
                {errors.description && <span>this field is required</span>}

                <input
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    type="number"
                    placeholder="Cooking Time"
                    {...register("cooking_time", { required: true })}
                />
                {errors.cooking_time && <span>this field is required</span>}

                <textarea
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    rows="3"
                    placeholder="Instructions"
                    {...register("instructions", { required: true })}
                />
                {errors.instructions && <span>this field is required</span>}

                <div className="flex flex-wrap mb-3">
                    {selectedIngredients.map(ingredientId => {
                        const ingredient = ingredients.find(i => i.id === ingredientId)
                        return (
                            <div key={ingredientId} className="bg-blue-500 text-white p-2 m-1 rounded">
                                {ingredient?.name}
                                <span
                                    className="ml-2 cursor-pointer"
                                    onClick={() => handleIngredientDeselect(ingredientId)}
                                >
                                    &times;
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className="mb-3">
                    <input
                        className="bg-zinc-700 p-3 rounded-lg block w-full"
                        type="text"
                        placeholder="Search Ingredients..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsSearching(e.target.value !== "");
                        }}
                    />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                    {filteredIngredients.map((ingredient) => (
                        <div
                            key={ingredient.id}
                            className={`bg-zinc-800 text-white p-3 rounded-lg cursor-pointer hover:bg-zinc-600 ${selectedIngredients.includes(ingredient.id) ? 'border-2 border-blue-500' : ''
                                }`}
                            onClick={() => handleIngredientSelect(ingredient.id)}
                        >
                            {ingredient.name}
                        </div>
                    ))}
                </div>

                <div className="mb-3">
                    <input
                        className="bg-zinc-700 p-3 rounded-lg block w-full"
                        type="text"
                        placeholder="Add new ingredient"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />

                    <input
                        className="bg-zinc-700 p-3 rounded-lg block w-full mt-2"
                        type="number"
                        step="0.01"
                        placeholder="Calories per 100g"
                        value={newIngredientCalories}
                        onChange={(e) => setNewCal(e.target.value)}
                    />

                    <button
                        type="button"
                        className="bg-green-500 text-white p-2 rounded-lg mt-2"
                        onClick={async () => {
                            if (newIngredient.trim() && newIngredientCalories.trim()) {
                                try {
                                    const res = await createIngredient({
                                        name: newIngredient,
                                        calories_per_100g: newIngredientCalories
                                    });
                                    setIngredients([...ingredients, res.data]);
                                    setNewIngredient("");
                                    setNewIngredientCalories("");
                                    toast.success("Nuevo ingrediente creado");
                                } catch (error) {
                                    toast.error("Error al crear el ingrediente");
                                    console.error("Error adding ingredient:", error.response?.data || error.message);
                                }
                            } else {
                                toast.error("Debes ingresar tanto el nombre como las calorías.");
                            }
                        }}
                    >
                        Add Ingredient
                    </button>
                </div>

                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
                    Save
                </button>
            </form >

            {
                params.id && (
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                            onClick={async () => {
                                const acepted = window.confirm('Delete this recepie?')
                                if (acepted) {
                                    await deleteRecepie(params.id)
                                    toast.success('Receta Eliminada')
                                    navigate("/recepies")
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )
            }
        </div >
    )
}
