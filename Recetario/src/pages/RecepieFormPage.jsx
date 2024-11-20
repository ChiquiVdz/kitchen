import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { createRecepie, deleteRecepie, updateRecepie, getRecepie } from '../api/recepies.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function RecepieFormPage() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateRecepie(params.id, data)
            toast.success('Receta Actualizada')
        } else {
            const res = await createRecepie(data)
            toast.success('Receta Creada')
        }

        navigate("/recepies")
    })

    useEffect(() => {
        async function loadRecepie() {
            if (params.id) {
                const res = await getRecepie(params.id)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
                setValue('cooking_time', res.data.cooking_time)
                setValue('instructions', res.data.instructions)
            }
        }
        loadRecepie()
    }, [])

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="text" placeholder="Title" {...register("title", { required: true })} />
                {errors.title && <span>this field is required</span>}

                <textarea className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' rows="3" placeholder="Description" {...register("description", { required: true })}></textarea>
                {errors.description && <span>this field is required</span>}

                <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type='number' placeholder='Cooking Time' {...register("cooking_time", { required: true })} />
                {errors.cooking_time && <span>this field is required</span>}

                <textarea className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' rows="3" placeholder='Instructions' {...register("instructions", { required: true })} />
                {errors.instructions && <span>this field is required</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>

            {params.id && (
                <div className='flex justify-end'>
                    <button className='bg-red-500 p-3 rounded-lg w-48 mt-3' onClick={async () => {
                        const acepted = window.confirm('Delete this recepie?')
                        if (acepted) {
                            await deleteRecepie(params.id)
                            toast.success('Receta Eliminada')
                            navigate("/recepies")
                        }
                    }}>Delete</button>
                </div>
            )}
        </div>
    )
}