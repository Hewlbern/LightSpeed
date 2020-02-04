import React, { Component } from "react";

//surprisingly annoying date problem.
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// test it
export const a = new Date(days_28),
  b = new Date(EoTdate),
  difference = dateDiffInDays(a, b);



export function Fail_text() {
  var fail =
    "The Contractor is not entitled to an Extension of Time because: \n";

  return alert(fail);
}

export function fail_notice() {
  if (notice === "No") {
    var t_n =
      "You did not receive prompt written notice of this delay event \n ";
  } else {
    var t_n = "Click Okay";
  }
  return alert(t_n);
}

export function fail_delay() {
  if (delay === "No") {
    var t_d =
      "The contractor is not delayed by this event/Will not be delayed by this event \n";
  } else {
    var t_d = "Click Okay";
  }
  return alert(t_d);
}

export function cause() {
  if (onegreater === "Other") {
    var t_o =
      "The cause of the delay event is not a qualifying cause of delay \n";
  } else {
    var t_o = "Click Okay";
  }
  return alert(t_o);
}

export function EoTwritten() {
  if (EoTClaim === "No") {
    var t_Eot = "You have not received the EoT claim in written form \n";
  } else {
    var t_Eot = "Click Okay";
  }
  return alert(t_Eot);
}
export function t_e() {
  if (EoTEvidence === "No") {
    var t_eE = "The claim does not contain appropriate evidence \n ";
  } else {
    var t_eE = "Click Okay";
  }
  return alert(t_eE);
}

export function t_dif() {
  if (difference < 28) {
    var t_dif =
      "The EoT claim was not given within the required 28 Day time period \n  ";
  } else {
    var t_dif = "Click Okay";
  }
  return alert(t_dif);
}
