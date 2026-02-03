import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "../lib/jwt";
import LogoutButtonDropdown from "../components/logout";
import { getAllProducts } from "../lib/products";

// If you want server-side fetch via API route, we can also use fetch("/api/products")
export default async function ProductsPage() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  const user = verifyToken(tokenCookie);

  if (!user) {
    redirect("/login");
  }

  let products = [];

  try {
    const getproducts = await getAllProducts();
    products = getproducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Product Catalog</h1>
              <p className="text-gray-600">Browse and manage your product inventory</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                {products.length} {products.length === 1 ? 'Product' : 'Products'}
              </div>
              <Link
                href="/products/new"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </Link>
              <LogoutButtonDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-600 mb-8">Get started by adding your first product</p>
            <Link
              href="/products/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
                      ${product.price}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date(product.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/productbyid/${product.id}`}
                      className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/productbyid/${product.id}`}
                      className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                      title="Edit product"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}