import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'

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

    // 카테고리 인덱스에 따라 배경 그라데이션을 반환하는 함수
    const getGradientBackground = (title) => {
        switch (title) {
            case 'STUDY':
                return 'linear-gradient(180deg, #FFE490 0%, #D9585E 100%)'
            case 'EXERCISE':
                return 'linear-gradient(180deg, #FFE490 0%, #EABC30 95%)'
            case 'ROUTINE':
                return 'linear-gradient(180deg, #FFE490 0%, #FF9226 99.99%)'
            case 'HOBBY':
                return 'linear-gradient(180deg, #FFE490 0%, #FE5476 100%)'
            case 'SHOPPING':
                return 'linear-gradient(180deg, #FFE490 0%, #FF78B4 100%)'
            default:
                return 'linear-gradient(180deg, #FFE490 0%, #FFFFFF 100%)' // 기본 그라데이션
        }
    }

    const showImage = (title) => {
        switch (title) {
            case 'STUDY':
                return '/assets/images/study.svg' // 첫 번째 카테고리 이미지
            case 'EXERCISE':
                return '/assets/images/exercise.svg' // 두 번째 카테고리 이미지
            case 'ROUTINE':
                return '/assets/images/routine.svg' // 기본 이미지
            case 'HOBBY':
                return '/assets/images/hobby.svg' // 기본 이미지
            case 'SHOPPING':
                return '/assets/images/shopping.svg' // 기본 이미지
        }
    }

    return (
        <ul className="flex flex-row cards justify-center gap-[40px] px-12">
            {categories.map((category) => (
                <li
                    className="flex flex-col items-center cursor-pointer justify-center w-[220px] h-[320px] card text-center text-[20px]  font-extrabold text-white shadow-[0_0_10px_gray] border-solid rounded-xl"
                    key={category.idx}
                    onClick={() => handleCategoryClick(category.idx)}
                    style={{
                        background: getGradientBackground(category.title),
                    }} // 각 카테고리의 고유 키 설정
                >
                    <div className="w-[200px] h-[260px] relative">
                        <Image
                            src={showImage(category.title)} // 카테고리 제목에 맞는 이미지 소스 설정
                            alt={category.title} // 이미지 대체 텍스트 설정
                            fill
                            className="object-fill rounded-t-xl" // 이미지 스타일 적용
                        />
                    </div>
                    <button
                        onClick={() => handleCategoryClick(category.idx)} // 버튼 클릭 시 카테고리 클릭 핸들러 실행
                        className="w-full h-[80px]  items-center justify-center  text-white " // 버튼 스타일 적용
                    >
                        {category.title} {/* 버튼에 카테고리 제목 표시 */}
                    </button>
                </li>
            ))}
        </ul>
    )
}
