import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWedding } from "@/context/useWedding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import FadeIn from "@/components/animations/FadeIn";
import Loading from "@/components/wedding/Loading";
import Footer from "@/components/wedding/Footer";

const Login: React.FC = () => {
    const [email, setEmail] = useState("user@gmail.com");
    const [password, setPassword] = useState("password");
    const [isLoading, setIsLoading] = useState(false);
    const { login, isLoggedIn, weddingData, globalIsLoading } = useWedding();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || email.length < 6) {
            toast({
                title: "Please enter a valid email!",
                description:
                    "Email is a required field and must be at least 6 characters",
            });
            return;
        }

        if (!password || password.length < 6) {
            toast({
                title: "Please enter a valid password!",
                description:
                    "Password field cannot be empty and be at least 6 characters",
            });
            return;
        }

        setIsLoading(true);

        try {
            const result = await login(email, password);
            if (!result.error) {
                toast({
                    title: "Welcome back!",
                    description: "You have been logged in successfully.",
                });
                navigate("/");
            }

            if (result.error) {
                let errorMessage = "An error occurred. Please try again.";

                if (
                    result.error.message?.includes("Invalid login credentials")
                ) {
                    errorMessage =
                        "Invalid email or password. Please check your credentials.";
                } else if (
                    result.error.message?.includes("User already registered")
                ) {
                    errorMessage =
                        "An account with this email already exists. Please try logging in instead.";
                } else if (
                    result.error.message?.includes("Email not confirmed")
                ) {
                    errorMessage =
                        "Please check your email and confirm your account before logging in.";
                } else if (result.error.message) {
                    errorMessage = result.error.message;
                }

                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md">
                    <FadeIn>
                        <div className="text-center mb-8">
                            <Link
                                to="/"
                                className="text-2xl font-serif font-medium tracking-tight hover:opacity-80"
                            >
                                {`${weddingData.couple.groomName[0]} &
                        ${weddingData.couple.brideName[0]} Wedding`}
                            </Link>
                            <p className="text-muted-foreground mt-2">Login</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={100}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Login to Edit
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    noValidate
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Your password"
                                            minLength={6}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Please wait..." : "Login"}
                                    </Button>
                                </form>

                                <div className="mt-4 text-center">
                                    <Link
                                        to="/"
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        Back to Wedding Site
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
