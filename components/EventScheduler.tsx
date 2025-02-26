import { JSX, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  add,
  sub,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
} from "date-fns";

interface Event {
  id: number;
  date: string; // ISO string format
  title: string;
  duration: string;
  recurrence?: "weekly" | "monthly" | "";
}

interface ModalState {
  isOpen: boolean;
  event: Event | null;
  date: Date | null;
}

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    event: null,
    date: null,
  });
  const [formData, setFormData] = useState<{
    title: string;
    duration: string;
    recurrence: "weekly" | "monthly" | "";
  }>({
    title: "",
    duration: "",
    recurrence: "",
  });

  const handlePrevMonth = () =>
    setCurrentMonth((prev) => sub(prev, { months: 1 }));
  const handleNextMonth = () =>
    setCurrentMonth((prev) => add(prev, { months: 1 }));

  const handleOpenModal = (date: Date | null, event: Event | null = null) => {
    if (date) {
      date = startOfDay(date); // Normalize the date to the start of the day
    }

    setFormData({
      title: event?.title || "",
      duration: event?.duration || "",
      recurrence: event?.recurrence || "",
    });

    setModal({ isOpen: true, event, date });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, event: null, date: null });
    setFormData({ title: "", duration: "", recurrence: "" });
  };

  const handleSaveEvent = () => {
    const { title, duration, recurrence } = formData;

    if (!title || !duration) {
      alert("Please fill in all required fields.");
      return;
    }

    if (modal.event) {
      // Edit event
      setEvents((prev) =>
        prev.map((e) =>
          e.id === modal.event!.id
            ? {
                ...e,
                title,
                duration,
                recurrence,
                date: modal.date!.toISOString(),
              }
            : e
        )
      );
    } else if (modal.date) {
      // Add new event
      const newEvent: Event = {
        id: Date.now(),
        date: modal.date.toISOString(),
        title,
        duration,
        recurrence,
      };

      const newEvents: Event[] = [newEvent];
      if (recurrence === "weekly") {
        for (let i = 1; i <= 4; i++) {
          const recurringDate = add(modal.date, { weeks: i });
          newEvents.push({
            ...newEvent,
            id: Date.now() + i,
            date: recurringDate.toISOString(),
          });
        }
      } else if (recurrence === "monthly") {
        for (let i = 1; i <= 3; i++) {
          const recurringDate = add(modal.date, { months: i });
          newEvents.push({
            ...newEvent,
            id: Date.now() + i,
            date: recurringDate.toISOString(),
          });
        }
      }

      setEvents((prev) => [...prev, ...newEvents]);
    }

    handleCloseModal();
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const renderCalendar = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      const hasEvent = events.some((event) =>
        isSameDay(parseISO(event.date), day)
      );

      days.push(
        <div
          key={day.toISOString()}
          onClick={() => handleOpenModal(day)}
          className={`p-4 border ${
            isSameMonth(day, currentMonth) ? "" : "bg-gray-100 text-gray-400"
          } ${hasEvent ? "bg-blue-100 border-blue-500" : ""}`}
        >
          <div>{format(day, "d")}</div>
        </div>
      );

      day = add(day, { days: 1 });
    }

    return days;
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4 text-sm">
        <button onClick={handlePrevMonth}>&lt; </button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth}> &gt;</button>
      </header>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
      <section className="mt-4">
        <h3 className="font-bold text-sm">Scheduled Events</h3>
        {events.length === 0 ? (
          <p className="text-sm">No events scheduled.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center mb-2 text-sm border p-2 rounded"
              >
                <span>
                  {event.title} - {event.duration}
                  {event.recurrence ? ` (Repeats: ${event.recurrence})` : ""}
                </span>
                <div className="space-x-2">
                  <button
                    className="text-xs text-yellow-600 ml-2"
                    onClick={() => handleOpenModal(null, event)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-600 text-left"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-4 rounded shadow-md w-72 lg:w-96">
            <h2 className="font-bold text-sm mb-4">
              {modal.event ? "Edit Event" : "Add Event"}
            </h2>
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="border p-2 w-full mb-2 text-sm"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 7:00 - 8:00am)"
              value={formData.duration}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, duration: e.target.value }))
              }
              className="border p-2 w-full mb-2 text-sm"
            />
            <select
              value={formData.recurrence}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  recurrence: e.target.value as "weekly" | "monthly" | "",
                }))
              }
              className="border p-2 w-full mb-4 text-sm"
            >
              <option value="">No Recurrence</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded text-sm"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                onClick={handleSaveEvent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;