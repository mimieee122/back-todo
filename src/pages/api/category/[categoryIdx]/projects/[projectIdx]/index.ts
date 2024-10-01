import { deleteProject } from '@/apis/projects/deleteProject'
import { getoneProject } from '@/apis/projects/getProject'
import { updateProject } from '@/apis/projects/updateProject'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const secret = process.env.SECRET_JWT

        if (!secret) {
            console.error('JWT_SECRET is not defined.')
            return res.status(500).json({
                message: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.',
            })
        }

        const projectIdx = Number(req.query.projectIdx)

        if (req.method === 'GET') {
            const project = await getoneProject(req, res, projectIdx)
            return res.status(200).json(project)
        } else if (req.method === 'PUT') {
            const project = await updateProject(req, res, projectIdx)
            return res.status(200).json(project)
        } else if (req.method === 'DELETE') {
            const project = await deleteProject(req, res, projectIdx)
            return res.status(200).json(project)
        } else {
            return res
                .status(405)
                .json({ message: '허용되지 않은 메서드입니다.' })
        }
    } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error)
        return res.status(401).json({ message: '토큰이 올바르지 않습니다.' })
    }
}

export default handler
