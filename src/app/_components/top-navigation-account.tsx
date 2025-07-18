"use client"

import {useEffect} from "react";

export default function TopNavigationAccount() {

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch("/api/auth/session")
            if (response.ok) {
                const data = await response.json()
                console.log(data)
            }
        }
        fetchSession()
    }, []);
    return (
        <>

        </>
    );
}
