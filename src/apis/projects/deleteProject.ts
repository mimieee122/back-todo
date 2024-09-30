import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

export const deleteProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    projectIdx: number
) => {
    const cookies = parseCookies({ req })
    const token = cookies['token']

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' })
    }

    try {
        const decoded = verify(token, process.env.SECRET_JWT as string) as {
            idx: number
        }
        const project = await prisma.project.findUnique({
            where: { idx: projectIdx },
            select: { userIdx: true },
        })

        if (!project) {
            return res
                .status(402)
                .json({ message: '프로젝트를 찾을 수 없습니다.' })
        }

        if (decoded.idx !== project.userIdx) {
            return res
                .status(400)
                .json({ message: '프로젝트를 삭제할 권한이 없습니다.' })
        }

        await prisma.project.delete({
            where: {
                idx: projectIdx,
            },
        })

        res.status(200).json({ message: '프로젝트가 삭제되었습니다.' })
    } catch (error) {
        console.error('프로젝트 삭제 중 오류 발생', error)
        res.status(500).json({ message: '서버 오류 발생' })
    }
}
