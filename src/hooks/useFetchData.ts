import { useQuery } from "react-query";

type FetchDataFunc<T> = (id: string) => Promise<T>;
type FetchFunc<T> = (id: string) => Promise<T>;

export const useFetchData = <T>(key: string, id: string, fetchData: FetchDataFunc<T>) => {
  const { data, isLoading } = useQuery<T, Error>([key, id], () =>
    fetchData(id || "")
  );

  return { data, isLoading };
};

export const useFetchMultipleData = <T>(key: string, data: string[] | undefined, fetchFunc: FetchFunc<T>) => {
  const { data: fetchedData, isLoading } = useQuery<T[], Error>(
    [key, data?.map((item) => item.split("/").pop())],
    async () => {
      const itemIds = data ? data.map((item: string) =>
        item.split("/").pop() as string
      ) : [];
      const itemPromises = itemIds.map((itemId: string) =>
        fetchFunc(itemId)
      );
      const items = await Promise.all(itemPromises);
      return items;
    },
    { enabled: Boolean(data) }
  );

  return { data: fetchedData, isLoading };
};


