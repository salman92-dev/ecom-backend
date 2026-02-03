"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButtonDropdown() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
      router.refresh(); // important!
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirm(!showConfirm)}
        className="cursor-pointer group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-red-700 hover:to-rose-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowConfirm(false)}
          ></div>

          {/* Confirmation Dialog */}
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Logout Confirmation</h3>
              <p className="text-sm text-gray-600">Are you sure you want to logout?</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging out...</span>
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

}
