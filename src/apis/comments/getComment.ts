import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const getComment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const commentIdx = req.query.commentIdx

        const comment = await prisma.comment.findUnique({
            where: { idx: Number(commentIdx) },
        })
        return res.status(200).json(comment)
    } catch {
        res.status(500).json({ message: '서버 오류' })
    }
}
