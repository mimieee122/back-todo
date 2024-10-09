/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/button'
import { useLogin } from './login.hook'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

// 데이터의 형식을 동일하게 강제하는 것
// (데이터가 공유되는 게 아니라, 타입 정의만 동일한 것.)
type FormData = {
    id: string
    password: string
}

export function Login() {
    // useLogin hook에서 가져온 onSubmitLogin 사용
    const { onSubmitLogin } = useLogin()

    // useForm으로 폼 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    return (
        <form
            onSubmit={handleSubmit(onSubmitLogin)} // handleSubmit으로 폼 제출
            className="flex flex-col justify-center items-center text-center gap-[20px] w-[600px] text-black p-4"
        >
            <div className="flex flex-row gap-[10px] items-end">
                <div className=" relative flex flex-col gap-0 items-center w-[350px] h-[300px] overflow-hidden">
                    <Image
                        src="/assets/images/flan emoji.png"
                        fill // 부모 요소에 가득 차게 함
                        alt="flan 이모지"
                        className="object-fill"
                    />
                </div>
                <div className="flex flex-col gap-[0px] items-center">
                    <div className=" relative flex flex-col  gap-0 items-end w-[470px] h-[150px] overflow-hidden">
                        <Image
                            src="/assets/images/flan.png"
                            fill // 부모 요소에 가득 차게 함
                            alt="flan 로고"
                            className="object-fill"
                        />
                    </div>
                    <div className="flex flex-row gap-[10px] mt-0 font-thin text-[20px] sub p-0 ">
                        <p className=" text-[black] font-thin">CREATE </p>
                        <p className=" text-[#ffbd43] font-thin">PLAN</p>
                        <p className=" text-[#ffbd43]">FAST</p>
                        <p className=" text-[black]"> WITH</p>
                        <p className=" text-[#ffbd43]">FLAN</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-[black] border-[4px] border-solid justify-center items-center text-center gap-[15px] w-[850px] text-black p-4 bg-white bg-opacity-20 rounded-xl">
                <p className="text-[40px] signIn text-[#ff3f6f]">SIGN IN</p>

                <label htmlFor="id">ID</label>
                <input
                    {...register('id', { required: 'id를 입력해 주세요.' })} // id 필드를 useForm과 연결
                    type="text"
                    id="name"
                    name="id"
                    className="text-center border-black border-[1px]"
                />
                {errors.id && <p>{errors.id.message}</p>}

                <label htmlFor="password">Password</label>
                <input
                    {...register('password', {
                        required: 'password를 입력해 주세요.',
                        // 필수 입력 유효성 검사
                    })}
                    type="password"
                    id="password"
                    name="password"
                    className="text-center border-black border-[1px]"
                />
                {errors.password && <p>{errors.password.message}</p>}

                <Button>로그인</Button>
            </div>
        </form>
    )
}
