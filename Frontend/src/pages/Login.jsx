import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {

      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <Card className="w-[400px]">

        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Email</Label>
            <Input name="email" onChange={handleChange} />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>

          <p className="text-sm">
            Don't have account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </p>

        </CardContent>

      </Card>

    </div>

  );

}