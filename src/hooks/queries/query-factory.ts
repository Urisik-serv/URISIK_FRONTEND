export const queryFactory = {
  recipe: {
    all: ["recipe"],
    searches: () => [...queryFactory.recipe.all, "search"],
    searchRecipe: (keyword: string) => [...queryFactory.recipe.all, keyword],
    popularSearch: () => [...queryFactory.recipe.searches(), "popular"],
    recommendSearch: () => [...queryFactory.recipe.searches(), "recommend"],
  },

  recommend: {
    all: (category: string|undefined) => category?[...["recommend"], category]:["recommend"],
    recommendWishHigh: (category: string|undefined) => [
      ...queryFactory.recommend.all(category),
      "wishHigh",
    ],
    recommendSafeHigh: (category: string|undefined) => [
      ...queryFactory.recommend.all(category),
      "safeHigh",
    ],
    recommendSafeTop: (category: string|undefined) => [
      ...queryFactory.recommend.all(category),
      "safeTop",
    ],
    alergySafe:()=>[...queryFactory.recommend.all(undefined), "alergySafe"],
  },

  wishList: {
    all: (familyRoomId: number | null) => ["wishLists", familyRoomId],
    familyWishLists: (familyRoomId: number | null) => [
      ...queryFactory.wishList.all(familyRoomId),
      "family",
    ],
    profileWishLists: (familyRoomId: number | null, profileId: number | undefined) => [
      ...queryFactory.wishList.all(familyRoomId),
      "profile",
      profileId,
    ],
    transWishLists: (familyRoomId: number | null,profileId: number | undefined) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId, profileId),
      "trans",
    ],
    originWishLists: (familyRoomId: number | null, profileId: number | undefined) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId, profileId),
      "origin",
    ],
    wishIds: (familyRoomId: number | null, profileId: number | undefined) => [
      ...queryFactory.wishList.profileWishLists(familyRoomId, profileId),
      "ids",
      profileId,
    ],
  },
};
