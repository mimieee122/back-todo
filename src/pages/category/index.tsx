import CategoriesComponent from '@/components/pages/categories/categoriescomponent'
import { LogOut } from '@/components/pages/home/logout'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Main() {
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axios.get('/api/me')
            return response.data
        },
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <nav className="flex flex-row text-[18px] justify-between items-center nav w-screen bg-[#EAEAEA]  p-[10px] pl-[20px] h-[50px] pr-[20px] bg-opacity-50 ">
                <div className="flex flex-row items-center gap-[10px]">
                    <p className="user  mt-[7px]">
                        USER : {me?.data?.nickname}
                    </p>
                </div>
                <div className="">
                    <LogOut />
                </div>
            </nav>
            <div className="flex  flex-col two justify-center items-center  gap-[80px] mt-[100px]">
                {/* <h1 className="press sentence text-[24px] text-[#CECECE]   ">
                    CREATE PLAN FAST WITH FLAN
                </h1> */}
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
