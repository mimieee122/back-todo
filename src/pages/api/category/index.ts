import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const secret = process.env.SECRET_JWT

    if (!secret) {
        return res
            .status(500)
            .json({ message: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.' })
    }
    try {
        if (req.method === 'GET') {
            const categories = await prisma.category.findMany({})

            return res.status(200).json(categories)
        } else {
            return res
                .status(405)
                .json({ message: '지원하지 않는 메서드입니다.' })
        }
    } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error)
        return res.status(401).json({ message: '토큰이 올바르지 않습니다.' })
    }
}

export default handler
