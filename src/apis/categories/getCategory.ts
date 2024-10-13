import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const getCategories = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const categories = await prisma.category.findMany({})
        res.status(200).json(categories)
    } catch (error) {
        console.error('카테고리 전체 조회 중 오류 발생:', error)
        res.status(500).json({
            message: '서버 오류가 발생했습니다.',
        })
    }
}

export const getOneCategory = async (
    req: NextApiRequest,
    res: NextApiResponse,
    title: string
) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                title: title,
            },
        })
        res.status(200).json(category)
    } catch (error) {
        console.error('카테고리 조회 중 오류 발생:', error)
        res.status(500).json({
            message: '서버 오류가 발생했습니다.',
        })
    }
}
