export const queryFactory = {
  recipe: {
    all: ["recipe"],
    searches: () => [...queryFactory.recipe.all, "search"],
    searchRecipe: (keyword: string) => [...queryFactory.recipe.all, keyword],
    popularSearch: () => [...queryFactory.recipe.searches(), "popular"],
    recommendSearch: () => [...queryFactory.recipe.searches(), "recommend"],
  },

  recommend: {
    all: (category: string) => ["recommend", category],
    recommendWishHigh: (category: string) => [
      ...queryFactory.recommend.all(category),
      "wishHigh",
    ],
    recommendSafeHigh: (category: string) => [
      ...queryFactory.recommend.all(category),
      "safeHigh",
    ],
    recommendSafeTop: (category: string) => [
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
    profileWishLists: (familyRoomId: number | null) => [
      ...queryFactory.wishList.all(familyRoomId),
      "profile",
    ],
    transWishLists: (familyRoomId: number | null) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId),
      "trans",
    ],
    originWishLists: (familyRoomId: number | null) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId),
      "origin",
    ],
    wishIds: (familyRoomId: number | null, profileId: number | undefined) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId),
      "ids",
      profileId,
    ],
  },

  search: {
    all: () => ["search"],
    recommendSearch: () => [...queryFactory.search.all(), "recommend"],
  },
};
