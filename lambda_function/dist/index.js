"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const auth = __importStar(require("./handlers/auth"));
const appointments = __importStar(require("./handlers/appointments"));
const posts = __importStar(require("./handlers/posts"));
async function handler(event) {
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
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
}
