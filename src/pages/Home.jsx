import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setCategory,
  setPage,
} from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../features/cart/cartSlice";

export default function Home() {
  const dispatch = useDispatch();

  const { items, loading, category, page, limit } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filter by category
  const filtered =
    category === "all" ? items : items.filter((p) => p.category === category);

  // Pagination
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          {[...new Set(items.map((p) => p.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginated.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={(product) => dispatch(addToCart(product))}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => dispatch(setPage(i + 1))}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
