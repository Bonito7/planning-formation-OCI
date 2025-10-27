import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formationsService, modulesService } from "../services/api";

export const useFormations = () => {
  return useQuery({
    queryKey: ["formations"],
    queryFn: async () => {
      const [formationsResponse, modulesResponse] = await Promise.all([
        formationsService.getAll(),
        modulesService.getAll(),
      ]);

      const formations = formationsResponse.data;
      const modules = modulesResponse.data;

      // Ajouter le compte de modules à chaque formation
      const formationsWithModuleCount = formations.map((formation: any) => {
        const moduleCount = modules.filter(
          (module: any) =>
            module.formationId?._id === formation._id ||
            module.formationId === formation._id
        ).length;

        return {
          ...formation,
          modulesCount: moduleCount,
        };
      });

      return formationsWithModuleCount;
    },
  });
};

export const useCreateFormation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: formationsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
    },
  });
};

export const useUpdateFormation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      formationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
    },
  });
};

export const useDeleteFormation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: formationsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
    },
  });
};
