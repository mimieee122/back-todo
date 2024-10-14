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

    // Handle the form submission or action when a priority is clicked
    // const handlePriorityClick = (priorityIdx) => {
    //     // 여기에서 우선 순위를 클릭했을 때의 행동을 정의합니다.
    //     // router.push(`/priority/${priorityIdx}`)
    //     // 추가적인 라우팅 로직을 추가할 수 있습니다.
    // }

    const handlePriorityClick = (priorityIdx) => {
        router.push(`/priority/${priorityIdx}`)
    }

    return (
        <div>
            <h2 className="text-center text-2xl font-bold mb-4">Priorities</h2>
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
