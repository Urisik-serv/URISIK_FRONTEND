export const roleMap: Record<string, string> = {
  엄마: "MOM",
  아빠: "DAD",
  아들: "SON",
  딸: "DAUGHTER",
} as const;

export const preferenceMap: Record<string, string> = {
  한식: "KOREAN",
  중식: "CHINESE",
  일식: "JAPANESE",
  양식: "WESTERN",
  디저트: "DESSERT",
} as const;

export const allergyMap: Record<string, string> = {
  알류: "EGG",
  우유: "MILK",
  메밀: "BUCKWHEAT",
  땅콩: "PEANUT",
  대두: "SOYBEAN",
  밀: "WHEAT",
  잣: "PINE_NUT",
  호두: "WALNUT",
  게: "CRAB",
  새우: "SHRIMP",
  오징어: "SQUID",
  고등어: "MACKEREL",
  굴: "OYSTER",
  홍합: "MUSSEL",
  전복: "ABALONE",
  복숭아: "PEACH",
  토마토: "TOMATO",
  닭고기: "CHICKEN",
  돼지고기: "PORK",
  쇠고기: "BEEF",
  아황산류: "SULFITE",
  젤라틴: "EXTRACTED_INGREDIENTS",
} as const;

export const rolePicture: Record<string, string> = {
  MOM: "/assets/profile/mom-picture.png",
  DAD: "/assets/profile/dad-picture.png",
  DAUGHTER: "/assets/profile/daughter-picture.png",
  SON: "/assets/profile/son-picture.png",
} as const;
