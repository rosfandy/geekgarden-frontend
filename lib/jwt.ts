import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
    roles?: string[];
    isAdmin?: boolean;
    name?: string;
    email?: string;
    id?: number;
}

export const getRolesFromToken = (token: string | null): string[] | null => {
    if (!token) return null;
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.roles || (decoded.isAdmin ? ['Admin'] : []);
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
    }
};

export const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;
export const getDatasFromToken = (): Partial<DecodedToken> | null => {
    if (!token) return null;
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
    }
};