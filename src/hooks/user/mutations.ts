import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { UpdateProfileData } from "@/types/user-type/type";
import { sanitizeFlatStrings } from "@/utils/sanitize";
import { useMutation } from "@tanstack/react-query";

export const useUserUpdate = () =>
  useMutation({
    mutationFn: (input: UpdateProfileData) =>
      api
        .put(apiEndpoints.users.update(input.id), sanitizeFlatStrings(input))
        .then((res) => res.data),
  });

export const useUpdateAvatar = () =>
  useMutation({
    mutationFn: (input: { id: string; avatar: File }) => {
      const formData = new FormData();
      formData.append("avatar", input.avatar);

      return api
        .put(`${apiEndpoints.users.avatar(input.id)}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
