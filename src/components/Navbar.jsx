import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((a, c) => a + c.quantity, 0)
  );

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link
        to="/home"
        className="text-xl font-bold text-blue-600 hover:text-blue-700"
      >
        ShopEasy
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/home"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Home
        </Link>

        <Link
          to="/checkout"
          className="relative text-gray-700 hover:text-blue-600 font-medium"
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
