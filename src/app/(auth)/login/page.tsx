"use client";
import React from "react";

import { useAuthStore } from "@/store/auth";
function Login() {
    const {login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
            setError(() => "All fields are required");
            return;
            
        }
        setIsLoading(true);
        setError(null);
        const loginResponse = await login(email.toString(), password.toString());
        if (loginResponse.error) {
            setError(() => loginResponse.error!.message);
            return;
        }
        setIsLoading(() => false);



    return (
        <div>

        </div>
        
    );
}

export default Login;