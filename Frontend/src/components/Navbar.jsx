import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {

  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (

    <nav className="bg-white shadow-md border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">

        <Link to="/" className="font-bold text-xl">
          CardMatch
        </Link>

        <div className="flex gap-3">

          <Link to="/">
            <Button variant="ghost">
              Home
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