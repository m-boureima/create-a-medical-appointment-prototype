import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Shield, Clock, Users, Bot, ChevronDown, Stethoscope, Brain, Eye, Baby, Bone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/DoctorCard";
import { SearchBar } from "@/components/SearchBar";
import { SpecialtyFilter } from "@/components/SpecialtyFilter";
import { AppointmentModal } from "@/components/AppointmentModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    image: doctor1,
    rating: 4.9,
    reviews: 284,
    location: "Downtown Medical Center",
    nextAvailable: "Today, 3:00 PM",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "General Practitioner",
    image: doctor2,
    rating: 4.8,
    reviews: 412,
    location: "Westside Health Clinic",
    nextAvailable: "Tomorrow, 9:00 AM",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Neurologist",
    image: doctor3,
    rating: 4.9,
    reviews: 156,
    location: "University Hospital",
    nextAvailable: "Wed, 11:00 AM",
  },
  {
    id: 4,
    name: "Dr. Michael Adams",
    specialty: "Pediatrician",
    image: doctor4,
    rating: 4.7,
    reviews: 328,
    location: "Children's Care Center",
    nextAvailable: "Today, 4:30 PM",
  },
];

const specialties = [
  { id: "general", name: "General", icon: Stethoscope },
  { id: "cardiology", name: "Cardiology", icon: Heart },
  { id: "neurology", name: "Neurology", icon: Brain },
  { id: "ophthalmology", name: "Eye Care", icon: Eye },
  { id: "pediatrics", name: "Pediatrics", icon: Baby },
  { id: "orthopedics", name: "Orthopedics", icon: Bone },
];

const stats = [
  { icon: Users, value: "10k+", label: "Patients Served" },
  { icon: Heart, value: "500+", label: "Expert Doctors" },
  { icon: Shield, value: "100%", label: "Secure & Private" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const Index = () => {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);

  const handleBookAppointment = (doctor: typeof doctors[0]) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground">MediBook</span>
            </div>
            
            {/* Specialties Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                  Specialties
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-popover border border-border">
                {specialties.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <DropdownMenuItem
                      key={spec.id}
                      className="flex items-center gap-3 p-3 cursor-pointer"
                      onClick={() => setSelectedSpecialty(spec.id)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{spec.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#doctors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Find Doctors</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">My Dashboard</Link>
            <Link to="/chatbot">
              <Button size="sm" className="gap-2">
                <Bot className="h-4 w-4" />
                Ask AI
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Find & Book Your
            <span className="block gradient-hero bg-clip-text text-transparent">
              Perfect Doctor
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
            Connect with top-rated healthcare professionals in your area. 
            Book appointments instantly, anytime.
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar
              specialty={specialty}
              location={location}
              onSpecialtyChange={setSpecialty}
              onLocationChange={setLocation}
              onSearch={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label} 
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Top-Rated Doctors
              </h2>
              <p className="text-muted-foreground">
                Choose from our network of trusted healthcare professionals
              </p>
            </div>
          </div>

          <div className="mb-8">
            <SpecialtyFilter
              selected={selectedSpecialty}
              onSelect={setSelectedSpecialty}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                {...doctor}
                onBook={() => handleBookAppointment(doctor)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 MediBook. Your health, our priority.
          </p>
        </div>
      </footer>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default Index;
