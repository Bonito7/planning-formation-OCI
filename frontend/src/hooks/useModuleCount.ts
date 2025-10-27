import { useQuery } from "@tanstack/react-query";
import { modulesService } from "../services/api";

export const useModuleCount = (formationId: string) => {
  return useQuery({
    queryKey: ["modules", "count", formationId],
    queryFn: async () => {
      const response = await modulesService.getByFormation(formationId);
      return response.data.length;
    },
    enabled: !!formationId,
  });
};

export const useAllModulesCount = () => {
  return useQuery({
    queryKey: ["modules", "all-count"],
    queryFn: async () => {
      const response = await modulesService.getAll();
      const modules = response.data;

      // Compter les modules par formation
      const countByFormation: { [key: string]: number } = {};
      modules.forEach((module: any) => {
        const formationId = module.formationId?._id || module.formationId;
        if (formationId) {
          countByFormation[formationId] =
            (countByFormation[formationId] || 0) + 1;
        }
      });

      return countByFormation;
    },
  });
};
