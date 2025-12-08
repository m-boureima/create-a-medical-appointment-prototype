import { cn } from "@/lib/utils";
import { 
  Heart, 
  Brain, 
  Eye, 
  Baby, 
  Bone, 
  Stethoscope,
  type LucideIcon 
} from "lucide-react";

interface Specialty {
  id: string;
  name: string;
  icon: LucideIcon;
}

const specialties: Specialty[] = [
  { id: "general", name: "General", icon: Stethoscope },
  { id: "cardiology", name: "Cardiology", icon: Heart },
  { id: "neurology", name: "Neurology", icon: Brain },
  { id: "ophthalmology", name: "Eye Care", icon: Eye },
  { id: "pediatrics", name: "Pediatrics", icon: Baby },
  { id: "orthopedics", name: "Orthopedics", icon: Bone },
];

interface SpecialtyFilterProps {
  selected: string;
  onSelect: (id: string) => void;
}

export const SpecialtyFilter = ({ selected, onSelect }: SpecialtyFilterProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {specialties.map((specialty, index) => {
        const Icon = specialty.icon;
        const isSelected = selected === specialty.id;
        
        return (
          <button
            key={specialty.id}
            onClick={() => onSelect(specialty.id)}
            className={cn(
              "flex flex-col items-center gap-2 min-w-[80px] p-4 rounded-xl transition-all duration-200 animate-slide-up",
              isSelected
                ? "bg-primary text-primary-foreground shadow-hover"
                : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground shadow-soft"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium whitespace-nowrap">{specialty.name}</span>
          </button>
        );
      })}
    </div>
  );
};
