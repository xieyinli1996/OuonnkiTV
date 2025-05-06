import { recentSearchListAtom } from "@/app/lib/search/state";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";

export function useRecentSearch() {
  const [originalRecentSearchList, setOriginalRecentSearchList] =
    useAtom(recentSearchListAtom);
  const recentSearchList = [...originalRecentSearchList].sort(
    (a, b) => b.time - a.time,
  );
  function addRecentSearch(searchText: string) {
    let searchItem = recentSearchList.find((item) => item.name === searchText);
    if (searchItem) {
      searchItem.time = Date.now();
    } else {
      searchItem = {
        id: uuidv4(),
        name: searchText,
        time: Date.now(),
      };
      recentSearchList.unshift(searchItem);
    }
    setOriginalRecentSearchList(recentSearchList);
  }
  function deleteRecentSearch(searchText: string) {
    recentSearchList.splice(
      recentSearchList.findIndex((item) => item.name === searchText),
      1,
    );
    setOriginalRecentSearchList(recentSearchList);
  }

  return { recentSearchList, addRecentSearch, deleteRecentSearch };
}
