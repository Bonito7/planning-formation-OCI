// Supprimer React si non utilisé
import { useState } from "react";
import { Calendar } from "../components/Calendar";
import { useAuth } from "../contexts/AuthContext";

const ApprenantPage = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec Logo */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Logo Orange */}
              <div className="flex items-center space-x-3">
                <img
                  src="/images/orange-logo.png"
                  alt="Orange CI"
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-xl font-bold text-orange-600">
                  Planning des Formations
                </h1>
              </div>
            </div>

            {/* Navigation desktop - cachée sur mobile */}
            <div className="hidden sm:flex items-center space-x-4">
              <nav className="flex space-x-4">
                <a
                  href="/"
                  className="bg-orange-100 text-orange-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Planning
                </a>
                <a
                  href="/admin"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Administration
                </a>
              </nav>

              {/* Section utilisateur et déconnexion */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Connecté en tant que <strong>{user?.username}</strong>
                </span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-orange-300 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>

            {/* Menu hamburger - visible seulement sur mobile */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 p-2 rounded-md hover:bg-gray-100 text-2xl"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Menu mobile déroulant */}
          {isMobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4 space-y-2 bg-white">
              <a
                href="/"
                className="block px-3 py-3 bg-orange-50 text-orange-700 rounded-md font-medium text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📅 Planning
              </a>
              <a
                href="/admin"
                className="block px-3 py-3 text-gray-700 hover:bg-orange-50 rounded-md text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ⚙️ Administration
              </a>
              <div className="border-t border-gray-200 pt-3">
                <div className="px-3 py-2 text-sm text-gray-600">
                  👤 Connecté en tant que <strong>{user?.username}</strong>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 text-gray-700 hover:bg-orange-50 rounded-md text-base"
                >
                  🚪 Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Planning des Formations
            </h2>
            <p className="text-gray-600 mt-2">
              Consultez votre planning de formation jour par jour
            </p>
          </div>

          <Calendar />
        </div>
      </main>
    </div>
  );
};

export default ApprenantPage;
