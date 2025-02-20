import http from "k6/http";
import { check, sleep } from "k6";

// tearing down timings so we won't overkill github actions
export let options = {
  stages: [
    { duration: "20s", target: 100 },  // Ramp up to 100 users over 1 min
    { duration: "30s", target: 500 },  // Sustain 500 users for 3 min
    { duration: "10s", target: 100 },  // Ramp down
  ],
};

export default function () {
  let res = http.get("https://www.saucedemo.com");
  check(res, {
    "is status 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(1);
}
