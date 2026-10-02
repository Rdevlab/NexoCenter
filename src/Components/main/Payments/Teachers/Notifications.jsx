import React, { useCallback, useEffect, useRef, useState } from "react";
import notificationsData from "../../../../Constants/Notifications.json";

const getNotificationKey = (notification) =>
  `${notification.reciever}:${notification.timestamp}:${notification.sender}:${notification.message}`;

const loadNotifications = (personId) => {
  if (!personId) return notificationsData;

  try {
    const savedReadState = JSON.parse(
      localStorage.getItem(`notifications-read:${personId}`) || "{}",
    );

    return notificationsData.map((notification) => ({
      ...notification,
      read:
        savedReadState[getNotificationKey(notification)] ?? notification.read,
    }));
  } catch {
    return notificationsData;
  }
};

const Notifications = (props) => {
  const person = props.logedInPerson;
  const personId = person?.Id;
  const [notificationState, setNotificationState] = useState(() => ({
    personId,
    notifications: loadNotifications(personId),
  }));
  const userNotifications =
    notificationState.personId === personId
      ? notificationState.notifications
      : loadNotifications(personId);
  const notificationListRef = useRef(null);

  const markAsRead = useCallback(
    (notificationKey) => {
      if (!personId) return;

      setNotificationState((currentState) => {
        const currentNotifications =
          currentState.personId === personId
            ? currentState.notifications
            : loadNotifications(personId);

        return {
          personId,
          notifications: currentNotifications.map((notification) =>
            getNotificationKey(notification) === notificationKey
              ? { ...notification, read: true }
              : notification,
          ),
        };
      });

      try {
        const storageKey = `notifications-read:${personId}`;
        const savedReadState = JSON.parse(
          localStorage.getItem(storageKey) || "{}",
        );
        savedReadState[notificationKey] = true;
        localStorage.setItem(storageKey, JSON.stringify(savedReadState));
      } catch {
        // Keep the in-memory read state even if browser storage is unavailable.
      }
    },
    [personId],
  );

  useEffect(() => {
    const list = notificationListRef.current;
    if (!list || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            markAsRead(entry.target.dataset.notificationKey);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, root: list },
    );

    list
      .querySelectorAll('[data-notification-key][data-unread="true"]')
      .forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [markAsRead, userNotifications]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dateTime = `${year}-${month}-${day}`;
  const weekday = new Intl.DateTimeFormat("en", { weekday: "long" }).format(
    today,
  );
  const notifications = userNotifications
    .filter((notification) => notification.reciever === person?.Id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div className="text-white w-full h-full overflow-hidden flex flex-col gap-2 p-4">
      {/* todays date */}
      <div className="w-full flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 shadow-lg shadow-black/20 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/20">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3v3m8-3v3M4.5 9h15M6 5.5h12A1.5 1.5 0 0 1 19.5 7v12A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7A1.5 1.5 0 0 1 6 5.5Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Today
            </p>
            <p className="mt-1 text-sm text-slate-300">{weekday}</p>
          </div>
        </div>

        <time dateTime={dateTime} className="flex items-center gap-2 sm:gap-3">
          {[
            { label: "Year", value: year },
            { label: "Month", value: month },
            { label: "Day", value: day },
          ].map(({ label, value }, index) => (
            <React.Fragment key={label}>
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="text-lg font-light text-slate-600"
                >
                  /
                </span>
              )}
              <span className="text-center">
                <span className="block text-xl font-semibold tracking-wide text-white sm:text-2xl">
                  {value}
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  {label}
                </span>
              </span>
            </React.Fragment>
          ))}
        </time>
      </div>
      {/* notfis container */}
      <section
        aria-label="Notifications"
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-lg shadow-black/20"
      >
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Notifications
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Updates sent to your account
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {unreadCount} unread
          </span>
        </header>

        <div
          ref={notificationListRef}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          {notifications.length > 0 ? (
            <ul className="divide-y divide-white/[0.06]">
              {notifications.map((notification, index) => {
                const timestamp = new Date(notification.timestamp);
                const formattedDate = Number.isNaN(timestamp.getTime())
                  ? notification.timestamp
                  : new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(timestamp);

                return (
                  <li
                    key={`${notification.timestamp}-${index}`}
                    data-notification-key={getNotificationKey(notification)}
                    data-unread={String(!notification.read)}
                    className={`flex gap-4 px-5 py-5 transition-colors hover:bg-white/[0.03] sm:px-6 ${
                      notification.read ? "" : "bg-cyan-300/[0.025]"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-cyan-300 ring-1 ring-white/10">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-4.5-5.8V4a1.5 1.5 0 0 0-3 0v1.2A6 6 0 0 0 6 11v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0m6 0H9"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <p className="text-sm font-semibold capitalize text-slate-100">
                          {notification.sender}
                        </p>
                        <time
                          dateTime={notification.timestamp}
                          className="text-xs text-slate-500"
                        >
                          {formattedDate}
                        </time>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div className="mt-3 flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                            New
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(getNotificationKey(notification))
                            }
                            className="text-xs font-medium text-slate-400 underline decoration-slate-600 underline-offset-4 transition hover:text-white"
                          >
                            Mark as read
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex h-full min-h-48 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 ring-1 ring-white/10">
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-200">
                You’re all caught up
              </h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                New notifications for your account will appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Notifications;
