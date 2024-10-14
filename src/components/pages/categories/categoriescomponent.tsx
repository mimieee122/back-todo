import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CategoriesComponent() {
    const router = useRouter()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category') // API 엔드포인트를 설정합니다.
                setCategories(response.data)
            } catch (error) {
                console.error('Error fetching priorities:', error)
            }
        }

        fetchCategories()
    }, [])

    // Handle the form submission to create a new project

    const handleCategoryClick = (categoryIdx) => {
        router.push(`/category/${categoryIdx}`)
    }

    return (
        <div>
            <h2 className="text-center text-2xl font-bold mb-4">CATEGORIES</h2>
            <ul className="flex flex-row justify-center gap-[30px]">
                {categories.map((category) => (
                    <li
                        className="w-[150px] h-[100px] text-center text-[18px] font-bold bg-white bg-opacity-10 border-solid border-[1px] rounded-xl border-black"
                        key={category.idx}
                    >
                        <button
                            onClick={() => handleCategoryClick(category.idx)}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {category.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
