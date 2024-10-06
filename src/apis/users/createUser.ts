import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
// TypeScript를 사용하고 있다면, bcrypt의 타입 선언을 추가해야 해서
// pnpm add @types/bcrypt --save-dev 후 bcrypt import에 성공하였음.
import { hash } from 'bcrypt'
// TypeScript를 사용하고 있다면, jsonwebtoken의 타입 선언을 추가해야 해서
// pnpm add @types/jsonwebtoken --save-dev 후 jsonwebtoken import에 성공하였음.
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient()

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, password, nickname } = req.body

        const hashedPassword = await hash(password, 10)

        const existingUser1 = await prisma.user.findUnique({
            where: { id: id },
        })

        const existingUser2 = await prisma.user.findUnique({
            where: { nickname: nickname },
        })

        if (existingUser1 && existingUser2) {
            return res
                .status(400)
                .json({ message: '이미 존재하는 ID, 닉네임 입니다.' })
        }

        if (existingUser1) {
            return res.status(400).json({ message: '이미 존재하는 ID입니다.' })
        }

        if (existingUser2) {
            return res
                .status(400)
                .json({ message: '이미 존재하는 닉네임 입니다.' })
        }

        const user = await prisma.user.create({
            data: {
                id: id,
                password: hashedPassword,
                nickname: nickname,
            },
        })

        const token = sign(
            {
                idx: user.idx,
            },
            process.env.SECRET_JWT as string,
            {
                expiresIn: '10h',
            }
        )

        res.status(200).json({ message: 'success', user, token })
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error)
        res.status(500).json({
            message: '서버 오류가 발생했습니다.',
        })
    }
}
