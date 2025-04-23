"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPost = getPost;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createPost(event) {
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
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to create post" })
        };
    }
}
async function getPosts() {
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
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch posts" })
        };
    }
}
async function getPost(event) {
    var _a;
    try {
        const postId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
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
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch post" })
        };
    }
}
