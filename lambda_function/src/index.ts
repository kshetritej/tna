import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as auth from './handlers/auth';
import * as appointments from './handlers/appointments';
import * as posts from './handlers/posts';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const path = event.path;
    const method = event.httpMethod;

    // Auth routes
    if (path === '/api/login' && method === 'POST') {
      return await auth.login(event);
    }
    if (path === '/api/signup' && method === 'POST') {
      return await auth.signup(event);
    }
    if (path === '/api/signup/doctor' && method === 'POST') {
      return await auth.doctorSignup(event);
    }

    // Appointments routes
    if (path === '/api/appointment' && method === 'POST') {
      return await appointments.createAppointment(event);
    }
    if (path.match(/^\/api\/appointment\/\d+$/) && method === 'GET') {
      return await appointments.getAppointments(event);
    }

    // Posts routes
    if (path === '/api/post' && method === 'POST') {
      return await posts.createPost(event);
    }
    if (path === '/api/post' && method === 'GET') {
      return await posts.getPosts();
    }
    if (path.match(/^\/api\/post\/\d+$/) && method === 'GET') {
      return await posts.getPost(event);
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Route not found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}