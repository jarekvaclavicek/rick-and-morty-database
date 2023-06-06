import { useState } from "react";

const useCharacterSearch = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  return {
    searchText,
    statusFilter,
    handleSearchChange,
    handleStatusFilterChange
  };
};

export default useCharacterSearch;