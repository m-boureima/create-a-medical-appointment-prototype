import { useState } from "react";
import { format, isPast, isFuture } from "date-fns";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart,
  X,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { RescheduleModal } from "@/components/RescheduleModal";

import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  image: string;
  date: Date;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

const initialAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    image: doctor1,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: "10:00 AM",
    location: "Downtown Medical Center",
    status: "upcoming",
  },
  {
    id: "2",
    doctorName: "Dr. James Wilson",
    specialty: "General Practitioner",
    image: doctor2,
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: "2:30 PM",
    location: "Westside Health Clinic",
    status: "upcoming",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Chen",
    specialty: "Neurologist",
    image: doctor3,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    time: "11:00 AM",
    location: "University Hospital",
    status: "completed",
    notes: "Follow-up in 3 months",
  },
  {
    id: "4",
    doctorName: "Dr. Michael Adams",
    specialty: "Pediatrician",
    image: doctor4,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    time: "3:00 PM",
    location: "Children's Care Center",
    status: "completed",
    notes: "Annual checkup completed",
  },
];

const Dashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);

  const upcomingAppointments = appointments.filter(apt => apt.status === "upcoming");
  const pastAppointments = appointments.filter(apt => apt.status === "completed" || apt.status === "cancelled");

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === selectedAppointment.id
            ? { ...apt, status: "cancelled" as const }
            : apt
        )
      );
      toast({
        title: "Appointment Cancelled",
        description: `Your appointment with ${selectedAppointment.doctorName} has been cancelled.`,
      });
    }
    setCancelDialogOpen(false);
    setSelectedAppointment(null);
  };

  const handleRescheduleClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleModalOpen(true);
  };

  const handleReschedule = (newDate: Date, newTime: string) => {
    if (selectedAppointment) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === selectedAppointment.id
            ? { ...apt, date: newDate, time: newTime }
            : apt
        )
      );
      toast({
        title: "Appointment Rescheduled",
        description: `Your appointment has been moved to ${format(newDate, "MMMM d, yyyy")} at ${newTime}.`,
      });
    }
    setRescheduleModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">MediBook</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <User className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your appointments and view your medical history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 shadow-soft animate-slide-up" style={{ animationDelay: "0ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingAppointments.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-soft animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pastAppointments.filter(a => a.status === "completed").length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-soft animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pastAppointments.filter(a => a.status === "cancelled").length}</p>
                <p className="text-sm text-muted-foreground">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Upcoming Appointments</h2>
            <Link to="/">
              <Button variant="soft" size="sm">
                Book New
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="bg-card rounded-xl p-8 text-center shadow-soft">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No upcoming appointments</p>
              <Link to="/">
                <Button variant="hero">Find a Doctor</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((apt, index) => (
                <div
                  key={apt.id}
                  className="bg-card rounded-xl p-5 shadow-soft hover:shadow-card transition-shadow animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={apt.image}
                      alt={apt.doctorName}
                      className="w-16 h-16 rounded-xl object-cover ring-2 ring-accent"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{apt.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        </div>
                        <Badge className="w-fit bg-accent text-accent-foreground">
                          {format(apt.date, "EEE, MMM d")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary" />
                          {apt.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          {apt.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRescheduleClick(apt)}
                        className="flex-1 sm:flex-none"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelClick(apt)}
                        className="flex-1 sm:flex-none text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past Visits */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Past Visits</h2>

          {pastAppointments.length === 0 ? (
            <div className="bg-card rounded-xl p-8 text-center shadow-soft">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No past appointments yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastAppointments.map((apt, index) => (
                <div
                  key={apt.id}
                  className="bg-card rounded-xl p-4 shadow-soft animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={apt.image}
                      alt={apt.doctorName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground truncate">{apt.doctorName}</h3>
                        <Badge
                          variant={apt.status === "completed" ? "default" : "secondary"}
                          className={apt.status === "cancelled" ? "bg-destructive/10 text-destructive" : ""}
                        >
                          {apt.status === "completed" ? "Completed" : "Cancelled"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {apt.specialty} • {format(apt.date, "MMM d, yyyy")}
                      </p>
                      {apt.notes && (
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          Note: {apt.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Cancel Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your appointment with {selectedAppointment?.doctorName} on{" "}
              {selectedAppointment && format(selectedAppointment.date, "MMMM d, yyyy")} at {selectedAppointment?.time}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        appointment={selectedAppointment}
        onReschedule={handleReschedule}
      />
    </div>
  );
};

export default Dashboard;
