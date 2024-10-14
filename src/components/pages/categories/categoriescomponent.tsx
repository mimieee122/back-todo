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
            <ul className="flex flex-row justify-center gap-[30px]">
                {categories.map((category) => (
                    <li
                        className="w-[250px] h-[250px] text-center text-[20px] font-extrabold bg-white bg-opacity-10 border-solid border-[1px] rounded-xl border-black"
                        key={category.idx}
                    >
                        <button
                            onClick={() =>
                                handleCategoryClick(Number(category.idx))
                            }
                        >
                            {/*카테고리 상세 페이지에 categoryIdx 숫자로 전송하기 성공 ㅠㅠ*/}
                            {category.title}
                        </button>

                        {/* Projects inside the category */}
                        <ul>
                            {category.projects?.map((project) => (
                                <li
                                    key={project.idx} // Assuming project has a unique projectIdx
                                    className="p-2 mt-2 bg-gray-200 border rounded-md"
                                >
                                    {project.title}{' '}
                                    {/* Displaying project title */}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}
