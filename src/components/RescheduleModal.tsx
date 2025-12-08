import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    doctorName: string;
    specialty: string;
    image: string;
    date: Date;
    time: string;
  } | null;
  onReschedule: (newDate: Date, newTime: string) => void;
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];

export const RescheduleModal = ({
  isOpen,
  onClose,
  appointment,
  onReschedule,
}: RescheduleModalProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const handleSubmit = () => {
    if (date && selectedTime) {
      onReschedule(date, selectedTime);
      setDate(undefined);
      setSelectedTime(undefined);
    }
  };

  const handleClose = () => {
    setDate(undefined);
    setSelectedTime(undefined);
    onClose();
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-card">
        <div className="gradient-hero p-6">
          <div className="flex items-center gap-4">
            <img
              src={appointment.image}
              alt={appointment.doctorName}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-primary-foreground/20"
            />
            <div className="text-primary-foreground">
              <DialogTitle className="text-lg font-semibold">
                Reschedule Appointment
              </DialogTitle>
              <p className="text-primary-foreground/80 text-sm">{appointment.doctorName}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-secondary rounded-lg p-3 text-sm">
            <p className="text-muted-foreground">Current appointment:</p>
            <p className="font-medium text-foreground">
              {format(appointment.date, "EEEE, MMMM d, yyyy")} at {appointment.time}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Select New Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a new date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {date && (
            <div className="space-y-2 animate-slide-up">
              <Label>Select New Time</Label>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="hero"
              onClick={handleSubmit}
              disabled={!date || !selectedTime}
              className="flex-1"
            >
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
