import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { setCookie } from 'nookies'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, password } = req.body

        // if (!id || !password) {
        //     res.status(400).json({ message: '아이디, 비밀번호 작성 요망' })
        // }

        const user = await prisma.user.findUnique({
            where: { id: id },
        })

        if (user === null) {
            // return을 적어줘야! user가 null이면 여기서 멈추지!
            return res
                .status(401)
                .json({ message: '닉네임에 해당하는 유저가 없습니다.' })
        }

        const hashedPassword = user.password
        const isCorrect = await compare(password, hashedPassword)
        if (!isCorrect) {
            res.status(402).json({ message: '비밀번호가 일치하지 않습니다.' })
        }

        const payload = {
            idx: user.idx,
            nickname: user.nickname,
            createAt: user.createdAt,
            updateAt: user.updatedAt,
        }

        const token = await sign(payload, process.env.SECRET_JWT as string, {
            expiresIn: '10h',
        })

        setCookie({ res }, 'token', token, {
            maxAge: 60 * 60,
            path: '/',
            httpOnly: true,
            secure: false,
        })
        res.status(200).json({ message: '로그인에 성공하였습니다.', payload })
    } catch (error) {
        console.error('API 처리 중 오류 발생', error)
        res.status(500).json({ message: '서버 오류 발생' })
    }
}

export default handler
