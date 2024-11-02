import { useForm } from 'react-hook-form'
import { useSignUp } from './signup.hook'
import Image from 'next/image'
import Link from 'next/link'

type FormData2 = {
    id: string
    password: string
    nickname: string
}

export function SignUp() {
    const { onSubmitSignUp } = useSignUp()

    // useForm으로 폼 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData2>()

    return (
        <form
            className="flex flex-col mb-[5px] justify-center items-center h-screen w-screen"
            onSubmit={handleSubmit(onSubmitSignUp)}
        >
            {/* 달력과 SIGN UP 폼을 포함하는 부모 div */}
            <div className="relative flex flex-col items-center">
                {/* 달력 이미지 */}
                <div className="absolute z-10 w-[120px] h-[80px] mt-[35px]">
                    <Image
                        src="/assets/images/calendar_width.png"
                        fill
                        alt="달력"
                        className="object-cover"
                    />
                </div>

                {/* SIGN UP 폼 */}
                <div className="flex flex-col bg-white bg-opacity-10 p-[10px] justify-center items-center h-[450px] w-[400px] shadow-[0_0_15px_white] transition-shadow border-[#ff3f6f] border-[4px] border-solid rounded-xl gap-[20px] mt-[100px] relative z-0">
                    <p className="text-[45px] mt-[50px] signIn bg-opacity-80 text-[#ff3f6f]">
                        SIGN UP
                    </p>
                    <label htmlFor="id">ID</label>
                    <input
                        {...register('id', { required: 'id를 입력해 주세요.' })}
                        type="text"
                        id="name"
                        name="id"
                        className="text-center w-[200px] border-black border-[1px]"
                    />
                    {errors.id && <p>{errors.id.message}</p>}

                    <label htmlFor="password">PASSWORD</label>
                    <input
                        {...register('password', {
                            required: 'password를 입력해 주세요.',
                        })}
                        type="password"
                        id="password"
                        name="password"
                        className="text-center w-[200px] border-black border-[1px]"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <label htmlFor="nickname">NICKNAME</label>
                    <input
                        {...register('nickname', {
                            required: 'nickname을 입력해 주세요.',
                            maxLength: {
                                value: 3,
                                message:
                                    '⚠️ nickname은 세 글자 이내로 입력해 주세요.',
                            },
                        })}
                        type="text"
                        id="nickname"
                        name="nickname"
                        className="text-center w-[200px] border-black border-[1px]"
                    />
                    {errors.nickname && (
                        <p className="mb-[0px] text-red-500 text-sm">
                            {errors.nickname.message}
                        </p>
                    )}
                    <button className="w-[200px] h-[55px] pt-1 pb-1  shadow-2xl hover:shadow-[0_0_10px_white] transition-shadow bg-[#ff3f6f] bg-opacity-30 border-black border-[2px] mt-[5px] mb-[35px] border-solid rounded-md">
                        회원가입
                    </button>
                </div>
            </div>

            <div className="mt-[30px] text-[18px]">
                <Link href="/">
                    <button>HOME</button>
                </Link>
            </div>
        </form>
    )
}
