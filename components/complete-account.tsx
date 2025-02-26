'use client';
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import logo from './.../../../public/images/logo.png';
import google from './.../../../public/icons/google.png';
import envelope from './.../../../public/icons/envelope.png';
import lock from './.../../../public/icons/lock_dark.svg';
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?&()_+={}[:;'"<>,|/~!@#$%]).{8,15}$/;


const Login = () => {
    const userRef = useRef<HTMLInputElement | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUser, error } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        const token = searchParams.get("token"); // Extract token from URL
        if (!token) {
            setFetchError("Invalid or missing token.");
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const response = await fetch("https://api.hosoptima.com/api/v1/sales/auth/verify", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const userData = await response.json();
                setUser(userData); // Store user details in auth state
                setEmail(userData.email); // Auto-populate email field
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setFetchError(err.message);
                } else {
                    setFetchError("An unexpected error occurred.");
                }
            }
        };

        fetchUserDetails();
    }, [searchParams, setUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = searchParams.get("token"); // Get the token from the URL
            const response = await fetch("https://api.hosoptima.com/api/v1/sales/auth/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    token, // Send token for authentication
                }),
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your password.");
            }

            const data = await response.json();
            setUser(data); // Store user data
            router.push("/dashboard"); // Redirect after successful login
        } catch (err: unknown) {
            if (err instanceof Error) {
                setFetchError(err.message);
            } else {
                setFetchError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full lg:bg-blue-950 p-4">
            <div className="bg-white lg:bg-white rounded shadow p-10 max-w-[310px] lg:min-w-[500px] lg:min-h-[600px]">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-self-center h-6 w-40">
                        <Image src={logo} alt="logo image" />
                    </div>
                    <div>
                        <h3 className="ml-0 mt-11 text-blue-950 lg:text-2xl font-bold">
                            Complete your account to continue
                        </h3>
                        <p className="ml-0 mt-1 pt-2 text-dark text-sm font-normal">
                            Enter the password you would like to use to login below
                        </p>
                    </div>

                    {fetchError && <p className="text-red-600 text-center text-sm mt-2">{fetchError}</p>}

                    <div className="flex flex-col mt-6 gap-1">
                        <div className="p-2 pl-8 text-sm text-gray-500 bg-gray-300 border rounded">
                            {email || "example@email.com"}
                        </div>
                        <Image src={envelope} alt="email-icon" className="-mt-8 ml-2" />
                    </div>

                    <div className="relative flex mt-7 items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="min-w-[230px] lg:min-w-[420px] p-2 pl-8 text-sm text-dark bg-white border rounded pr-2"
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

                    <div>
                        <div className="flex items-center">
                            <input
                                type='checkbox'
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                className="mt-5 ml-0" />
                            <p className="text-black mt-5 max-w-19 ml-1 text-xs lg:text-sm text-left">
                                Remember me
                            </p>
                        </div>
                        <p className="text-blue-950 -mt-4 lg:-mt-5 max-w-19 ml-32 lg:ml-72 text-xs lg:text-sm text-left z-10 cursor-pointer">
                            Forgot Password?
                        </p>
                    </div>

                    <button
                        disabled={!validPassword ? true : false}
                        type="submit"
                        className="bg-blue-950 h-6.2 w-full p-2 ml-0 text-sm text-white rounded mt-3 cursor-pointer hover:bg-blue-900 disabled:bg-gray-400">
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <div className="flex items-center">
                        <Image src={google} alt="" className="absolute size-4 mt-3 ml-9 lg:ml-36 z-20" />
                        <div className="text-blue-950 text-sm text-center w-full pl-8 lg:pl-12 mt-3 ml-0 border font-bold p-2 w-24.2 rounded hover:bg-gray-300 cursor-pointer z-10">
                            Sign In with Google
                        </div>
                    </div>

                    <div>
                        <h3
                            className="mt-9 lg:mt-14 ml-3.5 md:ml-0 lg:ml-16 lg:text-nowrap text-center lg:text-left text-xs lg:text-sm text-black">
                            © {new Date().getFullYear()} Rights are Reserved by hosoptima.com
                        </h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;