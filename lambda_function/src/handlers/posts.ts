import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPost(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const { title, content, authorId } = JSON.parse(event.body || '{}');

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return {
      statusCode: 201,
      body: JSON.stringify(post)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create post" })
    };
  }
}

export async function getPosts(): Promise<APIGatewayProxyResult> {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch posts" })
    };
  }
}

export async function getPost(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const postId = event.pathParameters?.id;
    
    if (!postId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Post ID is required" })
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!post) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Post not found" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(post)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch post" })
    };
  }
}