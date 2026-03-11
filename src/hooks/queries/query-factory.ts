export const queryFactory = {
  recipe: {
    all: ["recipe"],
    searches: () => [...queryFactory.recipe.all, "search"],
    searchRecipe: (keyword: string) => [...queryFactory.recipe.all, keyword],
    popularSearch: () => [...queryFactory.recipe.searches(), "popular"],
    recommendSearch: () => [...queryFactory.recipe.searches(), "recommend"],
  },

  recommend: {
    all: (category?: string) => ["recommend", category],
    recommendWishHigh: (category?: string) => [
      ...queryFactory.recommend.all(category),
      "wishHigh",
    ],
    recommendSafeHigh: (category?: string) => [
      ...queryFactory.recommend.all(category),
      "safeHigh",
    ],
    recommendSafeTop: (category?: string) => [
      ...queryFactory.recommend.all(category),
      "safeTop",
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
    ) => [...queryFactory.wishList.all(familyRoomId), profileId, "profile"],
    transWishes: (
      familyRoomId: number | null,
      profileId: number | undefined,
    ) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId, profileId),
      "trans",
    ],
    originWishes: (
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
};
