import CategoriesComponent from '@/components/pages/categories/categoriescomponent'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    return (
        <div>
            <nav className="flex flex-row justify-between p-[10px] pl-[20px] pr-[20px] bg-white bg-opacity-5 ">
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
                        USER : {me.data.data.nickname}
                    </p>
                </div>
                <div className="flex flex-row mt-[10px] text-[18px] gap-[30px]">
                    <Link href="/">
                        <button>HOME</button>
                    </Link>
                    <Link href="/signUp">
                        <button>회원가입</button>
                    </Link>
                </div>
            </nav>
            <div className="flex flex-col justify-center items-center gap-[20px] mt-[150px]">
                <h1 className="text-[50px] text-[#ff3f6f] font-thin yellow">
                    CATEGORY
                </h1>
                <CategoriesComponent />
            </div>
        </div>
    )
}