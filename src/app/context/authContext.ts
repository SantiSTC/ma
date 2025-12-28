import axios from 'axios';

// ============================================================================
// CONFIGURACIÓN CRÍTICA DE AXIOS - DEBE IR AQUÍ ARRIBA
// ============================================================================

// Crear instancia de axios con configuración
const api = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    withCredentials: true, // ← CRÍTICO: envía cookies en cada request
    headers: {
        'Content-Type': 'application/json',
    }
});

// IMPORTANTE: También configurar los defaults por si acaso
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api/auth';

// ============================================================================
// TIPOS / INTERFACES
// ============================================================================

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface RegisterResponse {
    success: boolean;
    message: string;
    user: User;
}

interface LoginResponse {
    success: boolean;
    message: string;
    user: User;
}

interface CheckAuthResponse {
    authenticated: boolean;
    user?: User;
    message?: string;
}

interface LogoutResponse {
    success: boolean;
    message: string;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    user?: User;
    error?: string;
}

// ============================================================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================================================

// 1. REGISTER
export async function registerUser(
    username: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
): Promise<ApiResponse<User>> {
    try {
        const response = await api.post<RegisterResponse>('/register/', {
            username,
            email,
            password,
            first_name: firstName || '',
            last_name: lastName || ''
        });
        
        console.log('Usuario registrado:', response.data.user);
        return { success: true, data: response.data.user };
    } catch (error: any) {
        console.error('Error en registro:', error.response?.data?.error);
        return { 
            success: false, 
            error: error.response?.data?.error || 'Error de conexión' 
        };
    }
}

// 2. LOGIN
export async function login(
    usernameOrEmail: string,
    password: string
): Promise<ApiResponse<User>> {
    try {
        console.log('🔐 Intentando login...');
        console.log('🔐 withCredentials:', api.defaults.withCredentials);
        
        const response = await api.post<LoginResponse>('/login/', {
            username: usernameOrEmail,
            password
        });
        
        console.log('✅ Login exitoso:', response.data.user);
        console.log('✅ Status:', response.status);
        console.log('✅ Headers de respuesta completos:', response.headers);
        console.log('✅ Set-Cookie header:', response.headers['set-cookie']);
        
        // Esperar un momento para que la cookie se guarde
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('✅ Cookies DESPUÉS del login:', document.cookie);
        
        // Verificar si la cookie sessionid existe
        const hasSessionId = document.cookie.includes('sessionid');
        console.log('✅ ¿Tiene sessionid?', hasSessionId);
        
        if (!hasSessionId) {
            console.error('⚠️ WARNING: No se guardó la cookie sessionid después del login!');
            console.error('⚠️ Esto puede ser un problema de CORS o dominio');
        }
        
        return { success: true, user: response.data.user };
    } catch (error: any) {
        console.error('❌ Error en login:', error.response?.data);
        return { 
            success: false, 
            error: error.response?.data?.error || error.response?.data?.message || 'Error de conexión' 
        };
    }
}

// 3. CHECK AUTH
export async function checkAuth(): Promise<{ authenticated: boolean; user?: User }> {
    try {
        console.log('🔍 Verificando autenticación...');
        console.log('🔍 Cookies disponibles:', document.cookie);
        
        const response = await api.get<CheckAuthResponse>('/check-auth/');
        
        console.log('✅ Respuesta checkAuth:', response.data);
        
        if (response.data.authenticated) {
            console.log('✅ Usuario autenticado:', response.data.user);
            return { authenticated: true, user: response.data.user };
        }
        console.log('⚠️ Usuario no autenticado según backend');
        return { authenticated: false };
    } catch (error: any) {
        console.error('❌ Error en checkAuth:', error.response?.status, error.response?.data);
        console.error('❌ URL llamada:', error.config?.url);
        console.error('❌ Headers enviados:', error.config?.headers);
        return { authenticated: false };
    }
}

// 4. LOGOUT
export async function logout(): Promise<{ success: boolean }> {
    try {
        await api.post<LogoutResponse>('/logout/');
        console.log('✅ Logout exitoso');
        return { success: true };
    } catch (error: any) {
        console.error('❌ Error en logout:', error);
        return { success: false };
    }
}