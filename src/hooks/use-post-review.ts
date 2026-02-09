import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "../api/review";
import { formatYMD } from "../utils/date";
import type { createReview } from "../types/review";

function usePostReview() {
  const queryClient = useQueryClient();
  const today = formatYMD(new Date());

  return useMutation({
    mutationFn: ({ recipeId, score, isFavorite }: createReview) =>
      postReview({ recipeId, score, isFavorite }),
    mutationKey: ["review", today],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealplan", "today"] });
    },
  });
}

export default usePostReview;
