import { useState } from "react";
import { signupUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {

    try {

      const res = await signupUser(formData);

      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.message || "Signup failed");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <Card className="w-[400px]">

        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Name</Label>
            <Input name="name" onChange={handleChange} />
          </div>

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

          <Button onClick={handleSignup} className="w-full">
            Signup
          </Button>

          <p className="text-sm">
            Already have account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>

        </CardContent>

      </Card>

    </div>

  );

}