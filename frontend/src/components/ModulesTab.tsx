import React, { useState } from "react";
import {
  useModules,
  useCreateModule,
  useUpdateModule,
  useDeleteModule,
} from "../hooks/useModules";
import { useFormations } from "../hooks/useFormations";

const ModulesTab = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);

  const { data: modules, isLoading } = useModules();
  const { data: formations } = useFormations();
  const createModule = useCreateModule();
  const updateModule = useUpdateModule();
  const deleteModule = useDeleteModule();

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const selectedFormation = formations?.find(
      (f: any) => f._id === formData.get("formationId")
    );

    const moduleData = {
      formationId: formData.get("formationId") as string,
      titre: formData.get("titre") as string,
      horaire: {
        debut: formData.get("horaire_debut") as string,
        fin: formData.get("horaire_fin") as string,
      },
      date: new Date(formData.get("date") as string),
      formateur: {
        nom: formData.get("formateur_nom") as string,
        contact: formData.get("formateur_contact") as string,
      },
      type: formData.get("type") as "presentiel" | "en_ligne",
      lieu: selectedFormation?.lieu.nom || "",
    };

    await createModule.mutateAsync(moduleData);
    setShowCreateForm(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleUpdateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const selectedFormation = formations?.find(
      (f: any) => f._id === formData.get("formationId")
    );

    const moduleData = {
      formationId: formData.get("formationId") as string,
      titre: formData.get("titre") as string,
      horaire: {
        debut: formData.get("horaire_debut") as string,
        fin: formData.get("horaire_fin") as string,
      },
      date: new Date(formData.get("date") as string),
      formateur: {
        nom: formData.get("formateur_nom") as string,
        contact: formData.get("formateur_contact") as string,
      },
      type: formData.get("type") as "presentiel" | "en_ligne",
      lieu: selectedFormation?.lieu.nom || "",
    };

    await updateModule.mutateAsync({ id: editingModule._id, data: moduleData });
    setEditingModule(null);
  };

  if (isLoading) {
    return <div className="text-center py-4">Chargement des modules...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestion des Modules
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          + Nouveau Module
        </button>
      </div>

      {/* Create Module Form */}
      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Créer un nouveau module</h3>
          <form onSubmit={handleCreateModule} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre du module *
                </label>
                <input
                  type="text"
                  name="titre"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: Introduction à React"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Formation affiliée *
                </label>
                <select
                  name="formationId"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Sélectionnez une formation</option>
                  {formations?.map((formation: any) => (
                    <option key={formation._id} value={formation._id}>
                      {formation.nom} - {formation.vague}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Heure de début *
                  </label>
                  <input
                    type="time"
                    name="horaire_debut"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Heure de fin *
                  </label>
                  <input
                    type="time"
                    name="horaire_fin"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom du formateur *
                </label>
                <input
                  type="text"
                  name="formateur_nom"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact du formateur *
                </label>
                <input
                  type="text"
                  name="formateur_contact"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: jean.dupont@orange.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type de formation *
              </label>
              <select
                name="type"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Sélectionnez un type</option>
                <option value="presentiel">Présentiel</option>
                <option value="en_ligne">En ligne</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
              >
                Créer le module
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Module Form */}
      {editingModule && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Modifier le module</h3>
          <form onSubmit={handleUpdateModule} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre du module *
                </label>
                <input
                  type="text"
                  name="titre"
                  required
                  defaultValue={editingModule.titre}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Formation affiliée *
                </label>
                <select
                  name="formationId"
                  required
                  defaultValue={editingModule.formationId}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Sélectionnez une formation</option>
                  {formations?.map((formation: any) => (
                    <option key={formation._id} value={formation._id}>
                      {formation.nom} - {formation.vague}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={
                    new Date(editingModule.date).toISOString().split("T")[0]
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Heure de début *
                  </label>
                  <input
                    type="time"
                    name="horaire_debut"
                    required
                    defaultValue={editingModule.horaire.debut}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Heure de fin *
                  </label>
                  <input
                    type="time"
                    name="horaire_fin"
                    required
                    defaultValue={editingModule.horaire.fin}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom du formateur *
                </label>
                <input
                  type="text"
                  name="formateur_nom"
                  required
                  defaultValue={editingModule.formateur.nom}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact du formateur *
                </label>
                <input
                  type="text"
                  name="formateur_contact"
                  required
                  defaultValue={editingModule.formateur.contact}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type de formation *
              </label>
              <select
                name="type"
                required
                defaultValue={editingModule.type}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Sélectionnez un type</option>
                <option value="presentiel">Présentiel</option>
                <option value="en_ligne">En ligne</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
              >
                Modifier le module
              </button>
              <button
                type="button"
                onClick={() => setEditingModule(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-4">
        {modules?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun module créé.</p>
            <p className="text-sm">
              Cliquez sur "Nouveau Module" pour commencer.
            </p>
          </div>
        ) : (
          modules?.map((module: any) => (
            <div
              key={module._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {module.titre}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        module.type === "presentiel"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {module.type === "presentiel"
                        ? "👥 Présentiel"
                        : "💻 En ligne"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Formation:</span>{" "}
                      {module.formationId?.nom}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(module.date).toLocaleDateString("fr-FR")}
                    </div>
                    <div>
                      <span className="font-medium">Horaire:</span>{" "}
                      {module.horaire.debut} - {module.horaire.fin}
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Formateur:</span>{" "}
                    {module.formateur.nom} ({module.formateur.contact})
                  </div>

                  <div className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Lieu:</span> {module.lieu}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setEditingModule(module)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Êtes-vous sûr de vouloir supprimer ce module ?"
                        )
                      ) {
                        deleteModule.mutate(module._id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ModulesTab;
