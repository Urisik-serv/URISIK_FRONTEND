export const queryFactory = {
  recipe: {
    all: ["recipe"],
    searches: () => [...queryFactory.recipe.all, "search"],
    searchRecipe: (keyword: string, page?: number, size?: number) => [
      ...queryFactory.recipe.all,
      { keyword, page, size },
    ],
    popularSearch: () => [...queryFactory.recipe.searches(), "popular"],
    recommendSearch: () => [...queryFactory.recipe.searches(), "recommend"],
  },

  recommend: {
    all: (category: string | undefined) =>
      category ? [...["recommend"], category] : ["recommend"],
    recommendWishHigh: (category: string | undefined) => [
      ...queryFactory.recommend.all(category),
      "wishHigh",
    ],
    recommendSafeHigh: (category: string | undefined) => [
      ...queryFactory.recommend.all(category),
      "safeHigh",
    ],
    recommendSafeTop: (category: string | undefined) => [
      ...queryFactory.recommend.all(category),
      "safeTop",
    ],
    allergySafe: () => [
      ...queryFactory.recommend.all(undefined),
      "allergySafe",
    ],
  },

  wishList: {
    all: (familyRoomId: number | null) => ["wishLists", familyRoomId],
    familyWishLists: (familyRoomId: number | null) => [
      ...queryFactory.wishList.all(familyRoomId),
      "family",
    ],
    profileWishLists: (
      familyRoomId: number | null,
      profileId: number | undefined,
    ) => [...queryFactory.wishList.all(familyRoomId), "profile", profileId],
    transWishLists: (
      familyRoomId: number | null,
      profileId: number | undefined,
    ) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId, profileId),
      "trans",
    ],
    originWishLists: (
      familyRoomId: number | null,
      profileId: number | undefined,
    ) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId, profileId),
      "origin",
    ],
    wishIds: (familyRoomId: number | null, profileId: number | undefined) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId, profileId),
      "ids",
    ],
  },
  mealPlan: {
    all: (familyRoomId: number | null, date: string) => [
      "mealPlan",
      familyRoomId,
      date,
    ],
    today: (familyRoomId: number | null, date: string) => [
      ...queryFactory.mealPlan.all(familyRoomId, date),
      "today",
    ],
    week: (familyRoomId: number | null, date: string) => [
      ...queryFactory.mealPlan.all(familyRoomId, date),
      "week",
    ],
  },
};
