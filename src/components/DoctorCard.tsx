import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  nextAvailable: string;
  onBook: () => void;
}

export const DoctorCard = ({
  name,
  specialty,
  image,
  rating,
  reviews,
  location,
  nextAvailable,
  onBook,
}: DoctorCardProps) => {
  return (
    <div className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-scale-in">
      <div className="flex gap-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-xl object-cover ring-2 ring-accent"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground">{specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Next available:</span>
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            {nextAvailable}
          </Badge>
        </div>
      </div>

      <Button
        onClick={onBook}
        className="w-full mt-4"
        variant="hero"
        size="lg"
      >
        Book Appointment
      </Button>
    </div>
  );
};
