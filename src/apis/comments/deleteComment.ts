import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

const prisma = new PrismaClient()

export const deleteComment = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const cookies = parseCookies({ req })
    const token = cookies['token']

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' })
    }

    try {
        const commentIdx = req.query.commentIdx
        // 밑 줄을 안 써서 못했었음
        const { userIdx, projectIdx } = req.body
        //토큰 검증 및 사용자 정보 추출
        const decoded = verify(token, process.env.SECRET_JWT as string) as {
            idx: number
        }

        if (userIdx !== decoded.idx) {
            return res
                .status(403)
                .json({ message: '댓글을 삭제할 권한이 없습니다.' })
        }

        await prisma.comment.delete({
            where: {
                idx: Number(commentIdx),
                projectIdx: Number(projectIdx),
            },
        })

        res.status(200).json({ message: '댓글 삭제 완료' })
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error)
        return res.status(500).json({ message: '서버 오류' })
    }
}
