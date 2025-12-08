import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  specialty: string;
  location: string;
  onSpecialtyChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({
  specialty,
  location,
  onSpecialtyChange,
  onLocationChange,
  onSearch,
}: SearchBarProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-card p-2 flex flex-col sm:flex-row gap-2 animate-slide-up">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Specialty, condition, or doctor"
          value={specialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          className="pl-12 h-12 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
        />
      </div>
      <div className="hidden sm:block w-px bg-border" />
      <div className="flex-1 relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="City or zip code"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="pl-12 h-12 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
        />
      </div>
      <Button onClick={onSearch} variant="hero" size="lg" className="sm:w-auto w-full">
        Search
      </Button>
    </div>
  );
};
