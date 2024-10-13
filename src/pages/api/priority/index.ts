import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            // 모든 우선 순위를 가져오기
            const priorities = await prisma.priority.findMany({})

            return res.status(200).json(priorities) // 성공적으로 우선 순위 반환
        } catch (error) {
            console.error('Error fetching priorities:', error)
            return res.status(500).json({
                message: '우선 순위를 가져오는 중 오류가 발생했습니다.',
            })
        }
    } else {
        // GET 외의 메서드에 대한 응답
        return res.status(405).json({ message: '허용되지 않는 메서드입니다.' })
    }
}
