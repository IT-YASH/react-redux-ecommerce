export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col">
      <div className="flex-1">
        <h4 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.title}
        </h4>

        <p className="text-gray-600 text-sm mb-3">₹ {product.price}</p>
      </div>

      <button
        onClick={() => onAdd(product)}
        className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
