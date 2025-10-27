import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { modulesService } from "../services/api";

export const useModules = () => {
  return useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      const response = await modulesService.getAll();
      return response.data;
    },
  });
};

export const useModulesByFormation = (formationId: string) => {
  return useQuery({
    queryKey: ["modules", "formation", formationId],
    queryFn: async () => {
      const response = await modulesService.getByFormation(formationId);
      return response.data;
    },
    enabled: !!formationId,
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: modulesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
};

export const useUpdateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      modulesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
};

export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: modulesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
};
