import { Box, Chip } from "@mui/material";
import { FC } from "react";

interface FiltersProps {
  selectedFilter: "last_added" | "newest" | "oldest";
  onChange: (filter: "last_added" | "newest" | "oldest") => void;
}
export const Filters: FC<FiltersProps> = ({ selectedFilter, onChange }) => {
  return (
    <Box display="flex" gap="8px">
      <Chip
        label="Last Added"
        onClick={() => onChange("last_added")}
        variant={selectedFilter === "last_added" ? "filled" : "outlined"}
        style={{
          backgroundColor:
            selectedFilter === "last_added" ? "#3C1661" : undefined,
          color: selectedFilter === "last_added" ? "#FFFFFF" : "#3C1661",
        }}
      />
      <Chip
        label="Newest"
        onClick={() => onChange("newest")}
        variant={selectedFilter === "newest" ? "filled" : "outlined"}
        style={{
          backgroundColor: selectedFilter === "newest" ? "#3C1661" : undefined,
          color: selectedFilter === "newest" ? "#FFFFFF" : "#3C1661",
        }}
      />
      <Chip
        label="Oldest"
        onClick={() => onChange("oldest")}
        variant={selectedFilter === "oldest" ? "filled" : "outlined"}
        style={{
          backgroundColor: selectedFilter === "oldest" ? "#3C1661" : undefined,
          color: selectedFilter === "oldest" ? "#FFFFFF" : "#3C1661",
        }}
      />
    </Box>
  );
};
