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
            case 'STUDY':
                return '/assets/images/study.png' // 첫 번째 카테고리 이미지
            case 'EXERCISE':
                return '/assets/images/exercise.png' // 두 번째 카테고리 이미지
            case 'ROUTINE':
                return '/assets/images/routine.png' // 기본 이미지
            case 'HOBBY':
                return '/assets/images/hobby.png' // 기본 이미지
            case 'SHOPPING':
                return '/assets/images/shopping.png' // 기본 이미지
        }
    }

    return (
        <ul className="flex flex-row justify-center  gap-12 px-12 ">
            {categories.map((category) => (
                // width의 값을 고정적으로 지정해두지 않기
                <li
                    className="min-w-[200px] w-[230px] flex-1 h-[380px] text-center text-[30px] hover:shadow-[0_0_25px_white] font-extrabold text-white shadow-[0_0_15px_white] transition-shadow  bg-white bg-opacity-10 border-solid rounded-xl border-[#ff3f6f] border-[4px]"
                    key={category.idx}
                    style={{
                        backgroundImage: `url(${showImage(category.title)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center', // 배경 이미지의 위치 설정
                        backgroundRepeat: 'no-repeat',
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
    )
}
