import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getRolesFromToken } from '../../../lib/jwt';

interface AuthMiddlewareProps {
    guard: string[];
}
export const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ guard }) => {
    const location = useLocation();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;
    const roles = getRolesFromToken(token);
    const hasAccess = (guard.includes("All") && token) || (roles && roles.some(role => guard.includes(role)));

    if (!token) {
        if (guard.includes("Admin")) return <Navigate to="/login" state={{ from: location }} replace />;
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (guard.includes("Admin") && !roles?.some(role => role === "Admin")) {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }

    return hasAccess ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location }} replace />;
};