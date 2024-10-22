import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function PrioritiesComponent() {
    const [priorities, setPriorities] = useState([])
    const router = useRouter()
    // Fetch priorities from the API when the component mounts
    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                const response = await axios.get('/api/priority') // API 엔드포인트를 설정합니다.
                setPriorities(response.data)
            } catch (error) {
                console.error('Error fetching priorities:', error)
            }
        }

        fetchPriorities()
    }, [])

    const handlePriorityClick = (priorityIdx) => {
        router.push(`/priority/${priorityIdx}`)
    }

    return (
        <div>
            <ul className="flex flex-row justify-center gap-[30px]">
                {priorities.map((priority) => (
                    <li
                        className="w-[150px] h-[100px] text-center text-[18px] font-bold bg-white bg-opacity-10 border-solid border-[1px] rounded-xl border-black"
                        key={priority.idx}
                    >
                        <button
                            onClick={() => handlePriorityClick(priority.idx)}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {priority.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
