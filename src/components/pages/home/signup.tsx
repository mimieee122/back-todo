import { useForm } from 'react-hook-form'
import { useSignUp } from './signup.hook'
import Image from 'next/image'
import { useRouter } from 'next/router'

type FormData2 = {
    id: string
    password: string
    nickname: string
}

export function SignUp() {
    const router = useRouter()

    const { onSubmitSignUp } = useSignUp()

    // useForm으로 폼 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData2>()

    return (
        <form
            className="flex flex-col mb-[10px]"
            onSubmit={handleSubmit(onSubmitSignUp)}
        >
            <div className="absolute self-center z-10 w-[150px] h-[150px] mt-[5px]">
                <Image
                    src="/assets/images/calendar.png"
                    fill // 부모 요소에 가득 차게 함
                    alt="달력"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-[20px] h-screen w-screen justify-center items-center">
                <div className="flex flex-col bg-white bg-opacity-20 p-[10px] justify-center items-center h-[500px] w-[400px] border-solid rounded-2xl border-[black] border-[4px] gap-[20px]">
                    <p className="text-[40px] signIn bg-opacity-80 text-[#ff3f6f]">
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
                        })}
                        type="text"
                        id="nickname"
                        name="nickname"
                        className="text-center w-[200px] border-black border-[1px]"
                    />
                    {errors.nickname && <p>{errors.nickname.message}</p>}
                    <button className="w-[200px] h-[40px]  shadow-2xl hover:shadow-[0_0_10px_white] transition-shadow bg-[yellow] bg-opacity-30 border-black border-[3px] border-solid rounded-md">
                        회원가입
                    </button>
                </div>
                <button className="mt-[10px]" onClick={() => router.back()}>
                    뒤로가기
                </button>
            </div>
        </form>
    )
}
