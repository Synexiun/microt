"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
  isSunday,
} from "date-fns";
import { BOOKING_TIMES } from "@/lib/constants";

interface DateTimeStepProps {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export default function DateTimeStep({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: DateTimeStepProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const today = startOfDay(new Date());

  // Fetch booked slots when date changes
  const fetchBookedSlots = useCallback(async (dateStr: string) => {
    setLoadingSlots(true);
    try {
      const res = await fetch(
        `/api/appointments?date=${dateStr}`
      );
      if (res.ok) {
        const appointments = await res.json();
        const times = appointments
          .filter(
            (a: { status: string }) =>
              a.status !== "cancelled"
          )
          .map((a: { time: string }) => a.time);
        setBookedTimes(times);
      }
    } catch {
      setBookedTimes([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    } else {
      setBookedTimes([]);
    }
  }, [selectedDate, fetchBookedSlots]);

  // Calendar rendering
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const weeks: Date[][] = [];
  let day = calStart;
  while (day <= calEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    onDateSelect(dateStr);
    // Clear time selection when date changes
    onTimeSelect("");
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || isSunday(date);
  };

  const selectedDateObj = selectedDate ? new Date(selectedDate + "T00:00:00") : null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <h2 className="font-heading text-3xl text-white text-center mb-2">
        Pick a Date & Time
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Select your preferred appointment slot
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-dark-light border border-dark-lighter rounded-lg p-5">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="text-gray-400 hover:text-gold transition-colors p-1"
              aria-label="Previous month"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="font-heading text-lg text-white">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="text-gray-400 hover:text-gold transition-colors p-1"
              aria-label="Next month"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayLabels.map((d) => (
              <div
                key={d}
                className="text-center text-xs text-gray-500 font-medium py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {weeks.map((week, wi) =>
              week.map((date, di) => {
                const inMonth = isSameMonth(date, monthStart);
                const disabled = isDateDisabled(date);
                const isSelected =
                  selectedDateObj && isSameDay(date, selectedDateObj);
                const isToday = isSameDay(date, today);

                return (
                  <button
                    key={`${wi}-${di}`}
                    onClick={() => !disabled && inMonth && handleDateClick(date)}
                    disabled={disabled || !inMonth}
                    className={`
                      aspect-square flex items-center justify-center rounded text-sm
                      transition-all duration-200
                      ${!inMonth ? "text-gray-700 cursor-default" : ""}
                      ${
                        inMonth && disabled
                          ? "text-gray-600 cursor-not-allowed"
                          : ""
                      }
                      ${
                        inMonth && !disabled && !isSelected
                          ? "text-gray-300 hover:bg-dark-lighter hover:text-white cursor-pointer"
                          : ""
                      }
                      ${
                        isSelected
                          ? "bg-gold text-black font-semibold shadow-glow-sm"
                          : ""
                      }
                      ${
                        isToday && !isSelected
                          ? "ring-1 ring-gold/40 text-gold"
                          : ""
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Time slots */}
        <div className="bg-dark-light border border-dark-lighter rounded-lg p-5">
          <h3 className="font-heading text-lg text-white mb-4">
            {selectedDate
              ? `Available Times — ${format(new Date(selectedDate + "T00:00:00"), "MMM d, yyyy")}`
              : "Select a date first"}
          </h3>

          {!selectedDate ? (
            <div className="flex items-center justify-center h-48 text-gray-500">
              <p>Please choose a date from the calendar</p>
            </div>
          ) : loadingSlots ? (
            <div className="flex items-center justify-center h-48">
              <div className="h-8 w-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {BOOKING_TIMES.map((time) => {
                const isBooked = bookedTimes.includes(time);
                const isSelected = selectedTime === time;

                return (
                  <button
                    key={time}
                    onClick={() => !isBooked && onTimeSelect(time)}
                    disabled={isBooked}
                    className={`
                      py-3 px-4 rounded text-sm font-medium
                      transition-all duration-200
                      ${
                        isBooked
                          ? "bg-dark-lighter text-gray-600 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-gold text-black shadow-glow-sm"
                          : "bg-dark-lighter text-gray-300 hover:border-gold/30 hover:text-gold border border-transparent hover:border-gold/30"
                      }
                    `}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
