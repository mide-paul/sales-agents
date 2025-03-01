'use client';
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from './.../../../public/images/logo.png';
import google from './.../../../public/icons/google.png';
import envelope from './.../../../public/icons/envelope.png';
import lock from './.../../../public/icons/lock_dark.svg';
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?&()_+={}[:;'"<>,|/~!@#$%]).{8,15}$/;

const Login = () => {
    const userRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const { setUser, error } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("https://api.hosoptima.com/api/v1/sales/auth/verify", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include'  // This ensures cookies and credentials are sent
                });

                if (!response.ok) {
                    throw new Error("Failed to verify user.");
                }

                const data = await response.json();

                setUser(data.data); // Save user details
                setEmail(data.data.email); // Auto-fill email
            } catch (err: unknown) {
                setFetchError(err instanceof Error ? err.message : "An unexpected error occurred.");
            }
        };

        fetchUser();
    }, [setUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://api.hosoptima.com/api/v1/sales/auth/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                }),
                credentials: 'include'  // This ensures cookies and credentials are sent
            });

            if (!response.ok) {
                throw new Error("Sign up failed. Please try again.");
            }

            const data = await response.json();
            setUser(data.data);
            router.push("/");
        } catch (err: unknown) {
            setFetchError(err instanceof Error ? err.message : "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full lg:bg-blue-950 p-4">
            <div className="bg-white lg:bg-white rounded shadow p-10 max-w-[310px] lg:min-w-[500px] lg:min-h-[600px]">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-self-center h-6 w-40">
                        <Image src={logo} alt="logo image" />
                    </div>
                    <h3 className="ml-0 mt-11 text-blue-950 lg:text-2xl font-bold">
                        Setup your account to continue
                    </h3>
                    <p className="ml-0 mt-1 pt-2 text-black text-sm font-normal">
                        Enter the password you would like to use to sign up below
                    </p>

                    {fetchError && <p className="text-red-600 text-center text-sm mt-2">{fetchError}</p>}

                    <div className="flex flex-col mt-6 gap-1">
                        <div
                        className="p-2 pl-8 text-xs lg:text-sm text-gray-500 bg-gray-300 border rounded">
                            {email || "loading..."}
                        </div>
                        <Image src={envelope} alt="email-icon" className="-mt-7 lg:-mt-8 ml-2" />
                    </div>

                    <div className="relative flex mt-7 items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="min-w-[230px] lg:min-w-[420px] p-2 pl-8 text-xs lg:text-sm text-black bg-white border rounded pr-2"
                        />
                        <Image src={lock} alt="lock-icon" className="absolute left-2" />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="relative right-7 text-gray-600">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="relative flex mt-4 items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmpassword"
                            placeholder="Confirm Password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            className="min-w-[230px] lg:min-w-[420px] p-2 pl-8 text-xs lg:text-sm text-black bg-white border rounded pr-2"
                        />
                        <Image src={lock} alt="lock-icon" className="absolute left-2" />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="relative right-7 text-gray-600">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {error && <p className="text-red-600 text-center text-xs font-semibold mt-2">{error}</p>}

                    <button
                        disabled={!validPassword || !validMatch ? true : false}
                        type="submit"
                        className="bg-blue-950 h-6.2 w-full p-2 text-sm text-white rounded mt-3 cursor-pointer hover:bg-blue-900 disabled:bg-gray-400">
                        {loading ? "Signing up..." : "Complete sign up"}
                    </button>

                    <div className="flex items-center">
                        <Image src={google} alt="" className="absolute size-4 mt-3 ml-9 lg:ml-36 z-20" />
                        <div className="text-blue-950 text-sm text-center w-full pl-8 lg:pl-12 mt-3 border font-bold p-2 w-24.2 rounded hover:bg-gray-300 cursor-pointer z-10">
                            Sign Up with Google
                        </div>
                    </div>

                    <h3 className="mt-9 lg:mt-14 ml-3.5 md:ml-0 lg:ml-16 text-xs lg:text-sm text-black text-center">
                        © {new Date().getFullYear()} Rights are Reserved by hosoptima.com
                    </h3>
                </form>
            </div>
        </div>
    );
};

export default Login;