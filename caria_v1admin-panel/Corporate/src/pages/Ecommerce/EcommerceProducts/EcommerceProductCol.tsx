import React from "react";
import moment from "moment";

const handleValidDate = (date: any) => {
  if (!date) return "";
  const dateStr = Array.isArray(date) ? date[0] : date;
  const d = moment(dateStr, ["DD MMM, YYYY", "YYYY-MM-DD", "DD MMM Y"]);
  return d.isValid() ? d.format("DD MMM Y") : "10 Jan 2025";
};

const handleValidTime = (time: any) => {
  if (!time) return "";
  const timeStr = Array.isArray(time) ? time[1] : time;
  if (typeof timeStr === 'string' && (timeStr.includes("AM") || timeStr.includes("PM"))) {
    return timeStr;
  }
  const d = moment(timeStr, ["hh:mm A", "HH:mm", "YYYY-MM-DD HH:mm"]);
  return d.isValid() ? d.format("hh:mm A") : "10:33 AM";
};

const Rating = (cell: any) => {
  return (
    <React.Fragment>
      <span>
        <span className="badge bg-light text-body fs-12 fw-medium">
          <i className="mdi mdi-star text-warning me-1"></i>{cell.value}
        </span>
      </span>
    </React.Fragment>
  );
};

const Published = (cell: any) => {
  const value = cell.value !== undefined ? cell.value : (cell.getValue ? cell.getValue() : undefined);
  return (
    <React.Fragment>
      <span>
        {handleValidDate(value)}
        <small className="text-muted ms-1">{handleValidTime(value)}</small>
      </span>
    </React.Fragment>
  );
};

const Price = (cell: any) => {
  const value = cell.value !== undefined ? cell.value : (cell.getValue ? cell.getValue() : 0);
  return (
    <React.Fragment>
      {"£ " + (value || 0).toLocaleString()}
    </React.Fragment>
  );
};

export { Rating, Published, Price };
