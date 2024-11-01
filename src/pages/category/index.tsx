import CategoriesComponent from '@/components/pages/categories/categoriescomponent'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axios.get('/api/me')
            return response.data
        },
    })

    return (
        <div className="flex flex-col justify-center">
            <nav className="flex flex-row justify-between nav w-screen  p-[10px] pl-[20px] h-[60px] pr-[20px] bg-white bg-opacity-5 ">
                <div className="flex flex-row gap-[10px]">
                    <div className=" relative flex flex-col gap-0 items-start w-[30px] h-[30px] mt-[8px] overflow-hidden">
                        <Image
                            src="/assets/images/profile.png"
                            fill // 부모 요소에 가득 차게 함
                            alt="프로필 사진"
                            className="object-fill"
                        />
                    </div>
                    <p className="text-[18px] mt-[7px]">
                        USER : {me?.data?.nickname}
                    </p>
                </div>
                <div className="flex home flex-row mt-[10px] text-[18px] gap-[30px]">
                    <Link href="/">
                        <button>HOME</button>
                    </Link>
                </div>
            </nav>
            <div className="flex flex-col justify-center items-center gap-[50px] mt-[50px]">
                <h1 className="text-[70px] text-[#ff8fab] title font-thin category yellow">
                    CATEGORY
                </h1>
                <CategoriesComponent />
            </div>
            {/* <div className="flex flex-row gap-[30px] items-center mt-[50px] justify-center   ">
                <div className="text-center ">
                    <Link href="/priority">
                        <button className="border-[2px] border-[black] bg-white bg-opacity-10 border-solid rounded-md w-[250px] text-[20px] text-[black]">
                            PRIORITY 분류
                        </button>
                    </Link>
                </div>
            </div> */}
        </div>
    )
}
