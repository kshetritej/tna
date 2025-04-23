import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { SNS } from 'aws-sdk';

const prisma = new PrismaClient();
const sns = new SNS({ region: 'us-east-1' });
const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:376614585503:UserSignUps';

export async function login(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const { email, password } = JSON.parse(event.body || '{}');

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" })
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid password" })
      };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'default-secret'
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login Successful", token })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error })
    };
  }
}

export async function signup(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const { email, password, name } = JSON.parse(event.body || '{}');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    // Send SNS notification
    await sns.publish({
      TopicArn: SNS_TOPIC_ARN,
      Message: JSON.stringify({
        event: 'USER_SIGNUP',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          timestamp: new Date().toISOString()
        }
      }),
      Subject: 'New User Registration'
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created successfully", user: newUser })
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error })
    };
  }
}

export async function doctorSignup(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const {
      email,
      password,
      name,
      title,
      qualification,
      experience,
      address,
      phone,
      avatar
    } = JSON.parse(event.body || '{}');

    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email already exists" })
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        title,
        qualification,
        experience,
        address,
        phone,
        avatar,
        isDoctor: true,
      },
    });

    // Send SNS notification for doctor signup
    await sns.publish({
      TopicArn: SNS_TOPIC_ARN,
      Message: JSON.stringify({
        event: 'DOCTOR_SIGNUP',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          title: user.title,
          qualification: user.qualification,
          timestamp: new Date().toISOString()
        }
      }),
      Subject: 'New Doctor Registration'
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(user)
    };
  } catch (error) {
    console.error('Doctor signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
}
