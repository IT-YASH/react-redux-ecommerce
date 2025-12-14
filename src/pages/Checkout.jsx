import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-xl font-semibold text-gray-600">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
              <p className="text-sm font-medium">
                Subtotal: ₹{item.price * item.quantity}
              </p>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <h3 className="text-xl font-bold">Total Price: ₹{totalPrice}</h3>
      </div>
    </div>
  );
}
