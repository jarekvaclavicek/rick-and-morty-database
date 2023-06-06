import { TextInput, Select } from "@mantine/core";

interface SearchAndFilterProps {
  searchText: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: string;
  handleStatusFilterChange: (value: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchText,
  handleSearchChange,
  statusFilter,
  handleStatusFilterChange
}) => (
  <>
    <TextInput
      radius="md"
      value={searchText}
      onChange={handleSearchChange}
      placeholder="Search characters"
      variant="filled"
      mb={16}
      w={400}
    />

    <Select
      data={[
        { value: "", label: "All" },
        { value: "Alive", label: "Alive" },
        { value: "Dead", label: "Dead" },
        { value: "unknown", label: "Unknown" },
      ]}
      value={statusFilter}
      onChange={handleStatusFilterChange}
      placeholder="Filter by status"
      variant="filled"
      mb={16}
      radius="md"
    />
  </>
);

export default SearchAndFilter;
