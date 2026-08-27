(() => {
  "use strict";

  if (typeof module !== "undefined" && module.exports && typeof require === "function") {
    window.AINOBORU_DATA = require("../data/dashboard-data.json");
    return;
  }

  window.AINOBORU_DATA_READY = fetch("data/dashboard-data.json", {
    cache: "no-store",
    credentials: "same-origin"
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`dashboard-data.json: HTTP ${response.status}`);
    }
    return response.json();
  }).then((data) => {
    window.AINOBORU_DATA = data;
    return data;
  });
})();
