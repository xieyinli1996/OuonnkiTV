import { atom } from "jotai";
import type { RecentSearchItem } from "@/app/lib/type";
import { atomWithStorage } from "jotai/utils";

const RECENT_SEARCH_LIST_KEY = "recentSearchList";

const searchTextAtom = atom("");
const recentSearchListAtom = atomWithStorage(
  RECENT_SEARCH_LIST_KEY,
  [] as RecentSearchItem[],
);

export { searchTextAtom, recentSearchListAtom };
