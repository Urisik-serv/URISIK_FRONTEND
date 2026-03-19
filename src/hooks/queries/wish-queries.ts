import { infiniteQueryOptions } from "@tanstack/react-query";
import {
  getFamilyWishList,
  getProfileTransWishList,
  getProfileWishList,
} from "../../api/wish-list";
import { queryFactory } from "./query-factory";

export const wishQueries = {
  family: (familyRoomId: number | null, size: number) =>
    infiniteQueryOptions({
      queryFn: ({ pageParam }) =>
        getFamilyWishList(familyRoomId, size, pageParam),
      queryKey: queryFactory.wishList.familyWishLists(familyRoomId),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => {
        if (lastPage.headers["x-has-next"] === false) return undefined;
        return lastPage.headers["x-next-cursor"];
      },
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
      enabled: !!familyRoomId,
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.data.result),
        pageParams: data.pageParams,
      }),
    }),

  profileOrigin: (
    familyRoomId: number | null,
    profileId: number | undefined,
    size: number,
  ) =>
    infiniteQueryOptions({
      queryFn: ({ pageParam }) =>
        getProfileWishList(familyRoomId, profileId, size, pageParam),
      queryKey: queryFactory.wishList.originWishLists(familyRoomId),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.result.hasNext ? lastPage.result.nextCursor : undefined;
      },
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
      enabled: !!familyRoomId && !!profileId,
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.result.items),
        pageParams: data.pageParams,
      }),
    }),

  profileTrans: (
    familyRoomId: number | null,
    profileId: number | undefined,
    size: number,
  ) =>
    infiniteQueryOptions({
      queryFn: ({ pageParam }) =>
        getProfileTransWishList(familyRoomId, profileId, size, pageParam),
      queryKey: queryFactory.wishList.transWishLists(familyRoomId),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.result.hasNext ? lastPage.result.nextCursor : undefined;
      },
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
      enabled: !!familyRoomId && !!profileId,
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.result.items),
        pageParams: data.pageParams,
      }),
    }),
};
