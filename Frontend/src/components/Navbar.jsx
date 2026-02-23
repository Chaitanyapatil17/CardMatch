import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {

  const location = useLocation();
  const token = localStorage.getItem("token");

  // Hide Navbar on Landing, Login, Signup
  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) {
    return null;
  }

  // Also hide if not logged in
  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/dashboard" className="font-bold text-xl">
          CardMatch
        </Link>

        <div className="flex gap-3">

          <Link to="/dashboard">
            <Button variant="ghost">
              Dashboard
            </Button>
          </Link>

          <Link to="/history">
            <Button variant="ghost">
              History
            </Button>
          </Link>

          <Link to="/favorites">
            <Button variant="ghost">
              Favorites
            </Button>
          </Link>

          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>

      </div>

    </nav>
  );
}