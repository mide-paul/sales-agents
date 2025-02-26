'use client';
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import logo from './../public/images/logo.png';
import google from './../public/icons/google.png';
import envelope from './../public/icons/envelope.png';
import lock from './../public/icons/lock_dark.svg';
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "./store/authStore";

const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[@]).{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?&()_+={}[:;'"<>,|/~!@#$%]).{8,15}$/;


const CompanyLogin = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { login, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password])

  // // Redirect if already logged in
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/dashboard");
  //   }
  // }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validEmail || !validPassword) return;

    setLoading(true);
    try {
      // Simulate login request
      const response = await login(email, password); // Assuming this returns a token or user data
      const { token } = response; // Extract token from response

      if (!token) {
        console.error("❌ Token not found in response.");
        return;
      }

      // Set authentication cookie
      setCookie("authToken", token, {
        maxAge: rememberMe ? 60 * 60 * 24 * 7 : 0, // 7 days if "Remember Me" is checked, session cookie otherwise
        path: "/", // Cookie accessible across the site
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF
      });

      // Store token in localStorage for easy access in frontend
      localStorage.setItem("token", token);

      // Store user credentials in localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify({ email, password }));
      }

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Login failed:", err);
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
        <form onSubmit={handleLogin}>
          <div className="flex items-center justify-self-center h-6 w-40">
            <Image src={logo} alt="logo image" />
          </div>
          <div>
            <h3 className="ml-0 mt-11 text-blue-950 text-base font-bold">
              Sign In
            </h3>
            <p className="ml-0 mt-1 pt-2 text-dark text-sm font-normal">
              Welcome back! Please enter your details below
            </p>
          </div>

          <div className="flex flex-col mt-0 ml-0 gap-1">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              className="mt-10 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
            />
            <Image src={envelope} alt="" className="-mt-8 ml-2" />
          </div>

          <div className="relative flex mt-7 items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              autoComplete="new-password"
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              className="mt-0 min-w-[230px] lg:min-w-[420px] p-2 pl-8 text-sm text-dark bg-white border border-gray rounded pr-2"
            />
            <Image src={lock} alt="" className="absolute left-2" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="relative right-7 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <p className="text-red-600 text-center text-sm font-semibold mt-2">{error}</p>}

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
            disabled={!validEmail || !validPassword ? true : false}
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

          {/* <div>
                      <p className="relative text-dark text-sm lg:text-center lg:mt-6 xl:mt-6 xl:ml-1 xx:mt-6 xx:ml-1 z-10">
                        Don&apos;t have an account?
                        <Link href="/sign-up"><span className="text-blue font-semibold pl-0.5">
                          sign Up</span>
                        </Link>
                      </p>
                    </div> */}
        </form>
      </div>
    </div>
  );
};

export default CompanyLogin;