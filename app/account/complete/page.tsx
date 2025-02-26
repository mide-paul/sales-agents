import { Suspense } from "react";
import Login from "@/components/complete-account";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Login />
        </Suspense>
    );
}