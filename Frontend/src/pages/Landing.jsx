import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ShinyButton";
import GradientButton from "@/components/GradientButton";
import GradientIconButton from "@/components/GradientIconButton";

export default function Landing() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">

            <div className="text-center max-w-3xl px-6">

                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-bold mb-6 leading-tight"
                >
                    Find the Perfect Credit Card
                    <span className="text-indigo-600">
                        {" "}for Your Lifestyle
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-gray-600 text-lg mb-8"
                >
                    CardMatch analyzes your income and spending
                    habits to recommend the most rewarding credit cards —
                    instantly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex justify-center gap-6"
                >
                    {/* Get Started Button */}
                    <Link to="/signup">
                        <GradientButton>
                            Get Started
                        </GradientButton>
                    </Link>

                    {/* Premium Shiny Login Button */}
                    <Link to="/login">
                        <ShinyButton className="px-8 py-3">
                            Login
                        </ShinyButton>
                    </Link>

                </motion.div>

            </div>
        </div>
    );
}