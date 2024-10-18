/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteProject } from '@/apis/projects/deleteProject'
import { getoneProject } from '@/apis/projects/getProject'
import { updateProject } from '@/apis/projects/updateProject'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const secret = process.env.SECRET_JWT

    if (!secret) {
        console.error('JWT_SECRET is not defined.')
        return res.status(500).json({
            message: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.',
        })
    }

    try {
        const projectIdx = Number(req.query.projectIdx)
        if (req.method === 'GET') {
            const project = await getoneProject(req, res, projectIdx)
            if (project === null) {
                return res
                    .status(404)
                    .json({ message: '해당 투두 항목을 찾을 수 없습니다.' })
            }
            return res.status(200).json(project)
        } else if (req.method === 'PUT') {
            const project = await updateProject(req, res, projectIdx)
            if (project === null) {
                return res
                    .status(404)
                    .json({ message: '해당 투두 항목을 찾을 수 없습니다.' })
            }
            return res.status(200).json(project)
        } else if (req.method === 'DELETE') {
            const project = await deleteProject(req, res, projectIdx)
            if (project === null) {
                return res
                    .status(404)
                    .json({ message: '해당 투두 항목을 찾을 수 없습니다.' })
            }
            return res.status(200).json(project)
        } else {
            return res
                .status(405)
                .json({ message: '허용되지 않은 메서드입니다.' })
        }
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '토큰이 만료되었습니다.' })
        }
        console.error('API error:', error)
        return res.status(401).json({ message: '토큰 검증에 실패했습니다.' })
    }
}
