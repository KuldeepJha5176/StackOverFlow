"use client";
import React from "react";
import { useAuthStore } from "@/store/auth";
function Register() {
    const {createAccount, login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!firstName || !lastName || !email || !password) {
            setError(() => "All fields are required");
            return;
        }
        setIsLoading(true);
        setError(null);
        const response =  await createAccount(`${firstName} ${lastName}`, email?toString(), password?toString());
        if (response.error  ) {
            setError(() => response.error!.message);
            setIsLoading(false);
            return;
        }else{
           const loginResponse = await login(email.toString(), password.toString());
           if (loginResponse.error) {
            setError(() => loginResponse.error!.message);
            
            return;
           }
           setIsLoading(() => false);

  return (
    <div>
        {error && <p>{error}</p>}

      
    </div>
  );
}}

export default Register;