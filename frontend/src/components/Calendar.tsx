// Supprimer React si non utilisé
import { useMemo, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useModules } from "../hooks/useModules";

export const Calendar = () => {
  const { data: modules, isLoading } = useModules();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleEventClick = (info: any) => {
    console.log("🎯 Événement cliqué:", info.event.extendedProps);
    setSelectedEvent({
      module: info.event.extendedProps.module,
      formation: info.event.extendedProps.formation,
    });
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const events = useMemo(() => {
    if (!modules) return [];

    return modules.map((module: any) => {
      const formation = module.formationId;
      const startDateTime = new Date(module.date);
      const [startHours, startMinutes] = module.horaire.debut.split(":");
      const [endHours, endMinutes] = module.horaire.fin.split(":");

      startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));

      // Titre adapté mobile
      const title = isMobileView
        ? module.titre
        : `${module.titre} - ${formation?.nom || "Formation"}`;

      return {
        id: module._id,
        title: title,
        start: startDateTime,
        end: endDateTime,
        backgroundColor: formation?.couleur || "#FF6B6B",
        borderColor: formation?.couleur || "#FF6B6B",
        extendedProps: {
          module,
          formation,
        },
      };
    });
  }, [modules, isMobileView]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Chargement du calendrier...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={isMobileView ? "timeGridDay" : "timeGridWeek"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: isMobileView ? "" : "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        locale="fr"
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        // Optimisations mobile
        dayMaxEvents={isMobileView ? 2 : false}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        buttonText={{
          today: isMobileView ? "Auj." : "Aujourd'hui",
          month: isMobileView ? "Mois" : "Mois",
          week: isMobileView ? "Sem." : "Semaine",
          day: isMobileView ? "Jour" : "Jour",
        }}
      />

      {/* Modal mobile optimisé */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {selectedEvent.module.titre}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 text-sm">
                {/* Formation */}
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Formation:
                  </span>
                  {selectedEvent.formation ? (
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
                        style={{
                          backgroundColor:
                            selectedEvent.formation.couleur || "#FF6B6B",
                        }}
                      ></div>
                      <div>
                        <p className="text-gray-900 font-medium">
                          {selectedEvent.formation.nom}
                        </p>
                        {selectedEvent.formation.vague && (
                          <p className="text-gray-600 text-xs">
                            Vague: {selectedEvent.formation.vague}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      Formation non spécifiée
                    </p>
                  )}
                </div>

                {/* Date et heure */}
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Date et heure:
                  </span>
                  <p className="text-gray-900">
                    {new Date(selectedEvent.module.date).toLocaleDateString(
                      "fr-FR",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-gray-900 font-medium">
                    {selectedEvent.module.horaire.debut} -{" "}
                    {selectedEvent.module.horaire.fin}
                  </p>
                </div>

                {/* Formateur */}
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Formateur:
                  </span>
                  <p className="text-gray-900 font-medium">
                    {selectedEvent.module.formateur.nom}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    📧 {selectedEvent.module.formateur.contact}
                  </p>
                </div>

                {/* Type de formation */}
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Type:
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      selectedEvent.module.type === "presentiel"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-green-100 text-green-800 border border-green-200"
                    }`}
                  >
                    {selectedEvent.module.type === "presentiel"
                      ? "👥 Présentiel"
                      : "💻 En ligne"}
                  </span>
                </div>

                {/* Lieu */}
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Lieu:
                  </span>
                  <p className="text-gray-900">{selectedEvent.module.lieu}</p>

                  {/* Lien Google Maps */}
                  {selectedEvent.formation?.lieu?.lienMaps &&
                  selectedEvent.module.type === "presentiel" ? (
                    <div className="mt-2">
                      <a
                        href={selectedEvent.formation.lieu.lienMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-orange-500 text-white text-xs rounded-md hover:bg-orange-600 transition-colors"
                      >
                        <span className="mr-2">📍</span>
                        Voir sur Google Maps
                      </a>
                    </div>
                  ) : selectedEvent.module.type === "presentiel" ? (
                    <p className="text-gray-500 text-xs mt-1">
                      ℹ️ Aucun lien Google Maps configuré pour cette formation
                    </p>
                  ) : (
                    <p className="text-green-600 text-xs mt-1">
                      🟢 Formation en ligne - Pas de localisation physique
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
