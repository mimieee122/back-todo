import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CategoriesComponent() {
    const router = useRouter()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category')
                setCategories(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }

        fetchCategories()
    }, [])
    // Handle the form submission to create a new project

    const handleCategoryClick = (categoryIdx) => {
        router.push(`/category/${categoryIdx}`)
    }

    const showImage = (title) => {
        switch (title) {
            case 'Study':
                return '/assets/images/study.png' // 첫 번째 카테고리 이미지
            case 'Exercise':
                return '/assets/images/exercise.png' // 두 번째 카테고리 이미지
            case 'Routine':
                return '/assets/images/routine.png' // 기본 이미지
            case 'Hobby':
                return '/assets/images/hobby.png' // 기본 이미지
            case 'Shopping':
                return '/assets/images/shopping.png' // 기본 이미지
        }
    }

    return (
        <div>
            <ul className="flex flex-row justify-center gap-[30px]">
                {categories.map((category) => (
                    <li
                        className="w-[250px] h-[400px] text-center text-[30px] font-extrabold  text-white shadow-[0_0_15px_white] transition-shadow   bg-white bg-opacity-10 border-solid rounded-xl  border-[#ff3f6f] border-[4px]"
                        key={category.idx}
                        style={{
                            backgroundImage: `url(${showImage(
                                category.title
                            )})`,
                            backgroundSize: 'cover', // 배경 이미지를 버튼 크기에 맞게 조절
                            backgroundPosition: 'center', // 배경 이미지의 위치 설정
                        }}
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
