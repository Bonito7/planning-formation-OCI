// Supprimer useEffect si non utilisé
import React, { useState } from "react";
import {
  useFormations,
  useCreateFormation,
  useUpdateFormation,
  useDeleteFormation,
} from "../hooks/useFormations";
import ModulesTab from "../components/ModulesTab";
import { useAuth } from "../contexts/AuthContext";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("formations");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingFormation, setEditingFormation] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: formations, isLoading } = useFormations();
  const createFormation = useCreateFormation();
  const updateFormation = useUpdateFormation();
  const deleteFormation = useDeleteFormation();
  const { user, logout } = useAuth();

  // Couleurs prédéfinies pour le sélecteur
  const colorOptions = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
    "#14B8A6",
    "#EAB308",
    "#A855F7",
    "#F43F5E",
    "#0EA5E9",
  ];

  const handleCreateFormation = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const formationData = {
      nom: formData.get("nom") as string,
      vague: formData.get("vague") as string,
      couleur: selectedColor,
      periode: {
        debut: new Date(formData.get("periode_debut") as string),
        fin: new Date(formData.get("periode_fin") as string),
      },
      lieu: {
        nom: formData.get("lieu_nom") as string,
        lienMaps: formData.get("lieu_maps") as string,
      },
      periodeTutorat: {
        debut: new Date(formData.get("tutorat_debut") as string),
        fin: new Date(formData.get("tutorat_fin") as string),
      },
    };

    await createFormation.mutateAsync(formationData);
    setShowCreateForm(false);
    setSelectedColor("#3B82F6");
    (e.target as HTMLFormElement).reset();
  };

  const handleUpdateFormation = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const formationData = {
      nom: formData.get("nom") as string,
      vague: formData.get("vague") as string,
      couleur: selectedColor,
      periode: {
        debut: new Date(formData.get("periode_debut") as string),
        fin: new Date(formData.get("periode_fin") as string),
      },
      lieu: {
        nom: formData.get("lieu_nom") as string,
        lienMaps: formData.get("lieu_maps") as string,
      },
      periodeTutorat: {
        debut: new Date(formData.get("tutorat_debut") as string),
        fin: new Date(formData.get("tutorat_fin") as string),
      },
    };

    await updateFormation.mutateAsync({
      id: editingFormation._id,
      data: formationData,
    });
    setEditingFormation(null);
    setSelectedColor("#3B82F6");
  };

  const startEditing = (formation: any) => {
    setEditingFormation(formation);
    setSelectedColor(formation.couleur || "#3B82F6");
  };

  const generateRandomColor = () => {
    const randomColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setSelectedColor(randomColor);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

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
                  Administration - Formations
                </h1>
              </div>
            </div>

            {/* Navigation desktop - cachée sur mobile */}
            <div className="hidden sm:flex items-center space-x-4">
              <nav className="flex space-x-4">
                <a
                  href="/"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Planning
                </a>
                <a
                  href="/admin"
                  className="bg-orange-100 text-orange-700 px-3 py-2 rounded-md text-sm font-medium"
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
                className="block px-3 py-3 text-gray-700 hover:bg-orange-50 rounded-md text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📅 Planning
              </a>
              <a
                href="/admin"
                className="block px-3 py-3 bg-orange-50 text-orange-700 rounded-md font-medium text-base"
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
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("formations")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "formations"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Formations
              </button>
              <button
                onClick={() => setActiveTab("modules")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "modules"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Modules
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "formations" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Gestion des Formations
                  </h2>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    + Nouvelle Formation
                  </button>
                </div>

                {/* Create Formation Form */}
                {showCreateForm && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">
                      Créer une nouvelle formation
                    </h3>
                    <form
                      onSubmit={handleCreateFormation}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Nom de la formation
                          </label>
                          <input
                            type="text"
                            name="nom"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Vague
                          </label>
                          <input
                            type="text"
                            name="vague"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      {/* Sélecteur de couleur */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Couleur de la formation
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-8 h-8 rounded-full border border-gray-300"
                              style={{ backgroundColor: selectedColor }}
                            ></div>
                            <span className="text-sm text-gray-600">
                              {selectedColor}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={generateRandomColor}
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            🎲 Aléatoire
                          </button>
                        </div>

                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">
                            Choisissez une couleur :
                          </p>
                          <div className="grid grid-cols-8 gap-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                className={`w-6 h-6 rounded-full border-2 ${
                                  selectedColor === color
                                    ? "border-gray-800 scale-110"
                                    : "border-gray-300"
                                } transition-all hover:scale-110`}
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="text-xs text-gray-500 mb-1 block">
                            Ou choisissez une couleur personnalisée :
                          </label>
                          <input
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full h-10 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Début de période
                          </label>
                          <input
                            type="date"
                            name="periode_debut"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Fin de période
                          </label>
                          <input
                            type="date"
                            name="periode_fin"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Nom du lieu
                          </label>
                          <input
                            type="text"
                            name="lieu_nom"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Lien Google Maps
                          </label>
                          <input
                            type="url"
                            name="lieu_maps"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Début tutorat
                          </label>
                          <input
                            type="date"
                            name="tutorat_debut"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Fin tutorat
                          </label>
                          <input
                            type="date"
                            name="tutorat_fin"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                          Créer la formation
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreateForm(false);
                            setSelectedColor("#3B82F6");
                          }}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Edit Formation Form */}
                {editingFormation && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">
                      Modifier la formation
                    </h3>
                    <form
                      onSubmit={handleUpdateFormation}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Nom de la formation
                          </label>
                          <input
                            type="text"
                            name="nom"
                            required
                            defaultValue={editingFormation.nom}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Vague
                          </label>
                          <input
                            type="text"
                            name="vague"
                            required
                            defaultValue={editingFormation.vague}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      {/* Sélecteur de couleur pour l'édition */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Couleur de la formation
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-8 h-8 rounded-full border border-gray-300"
                              style={{ backgroundColor: selectedColor }}
                            ></div>
                            <span className="text-sm text-gray-600">
                              {selectedColor}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={generateRandomColor}
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            🎲 Aléatoire
                          </button>
                        </div>

                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">
                            Choisissez une couleur :
                          </p>
                          <div className="grid grid-cols-8 gap-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                className={`w-6 h-6 rounded-full border-2 ${
                                  selectedColor === color
                                    ? "border-gray-800 scale-110"
                                    : "border-gray-300"
                                } transition-all hover:scale-110`}
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="text-xs text-gray-500 mb-1 block">
                            Ou choisissez une couleur personnalisée :
                          </label>
                          <input
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full h-10 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Début de période
                          </label>
                          <input
                            type="date"
                            name="periode_debut"
                            required
                            defaultValue={
                              new Date(editingFormation.periode.debut)
                                .toISOString()
                                .split("T")[0]
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Fin de période
                          </label>
                          <input
                            type="date"
                            name="periode_fin"
                            required
                            defaultValue={
                              new Date(editingFormation.periode.fin)
                                .toISOString()
                                .split("T")[0]
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Nom du lieu
                          </label>
                          <input
                            type="text"
                            name="lieu_nom"
                            required
                            defaultValue={editingFormation.lieu.nom}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Lien Google Maps
                          </label>
                          <input
                            type="url"
                            name="lieu_maps"
                            required
                            defaultValue={editingFormation.lieu.lienMaps}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Début tutorat
                          </label>
                          <input
                            type="date"
                            name="tutorat_debut"
                            required
                            defaultValue={
                              new Date(editingFormation.periodeTutorat.debut)
                                .toISOString()
                                .split("T")[0]
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Fin tutorat
                          </label>
                          <input
                            type="date"
                            name="tutorat_fin"
                            required
                            defaultValue={
                              new Date(editingFormation.periodeTutorat.fin)
                                .toISOString()
                                .split("T")[0]
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                          Modifier la formation
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFormation(null);
                            setSelectedColor("#3B82F6");
                          }}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Formations List */}
                <div className="space-y-4">
                  {formations?.map((formation: any) => (
                    <div
                      key={formation._id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div
                              className="w-4 h-4 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: formation.couleur || "#3B82F6",
                              }}
                            ></div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {formation.nom}
                            </h3>
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                              {formation.vague}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Période:</span>
                              <p>
                                {new Date(
                                  formation.periode.debut
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  formation.periode.fin
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">Lieu:</span>
                              <p>{formation.lieu.nom}</p>
                            </div>
                            <div>
                              <span className="font-medium">Tutorat:</span>
                              <p>
                                {new Date(
                                  formation.periodeTutorat.debut
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  formation.periodeTutorat.fin
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                              <span className="font-medium">📚 Modules:</span>{" "}
                              <span className="font-bold">
                                {formation.modulesCount || 0} module(s)
                              </span>
                            </div>
                            {formation.lieu.lienMaps && (
                              <a
                                href={formation.lieu.lienMaps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-600 hover:text-orange-800 text-xs inline-flex items-center"
                              >
                                <span className="mr-1">📍</span>
                                Voir sur Maps
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4 flex-shrink-0">
                          <button
                            onClick={() => startEditing(formation)}
                            className="text-orange-600 hover:text-orange-800 text-sm px-3 py-1 border border-orange-200 rounded hover:bg-orange-50 transition-colors"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Êtes-vous sûr de vouloir supprimer cette formation ?"
                                )
                              ) {
                                deleteFormation.mutate(formation._id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "modules" && (
              <div>
                <ModulesTab />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
