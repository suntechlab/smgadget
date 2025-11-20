import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/users - Get all users
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 })
  }
}

// POST /api/users - Create a new user
export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') { // Prisma unique constraint violation code
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 })
    }
    console.error('Error creating user:', error)
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 })
  }
}