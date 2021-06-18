import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "20s", target: 800},
    { duration: "20s", target: 900},
    { duration: "20s", target: 1000},
    { duration: "20s", target: 1100},
    { duration: "20s", target: 1200},
    { duration: "20s", target: 1300},


  ],
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
};

export default function main() {
  let response;
  response = http.get("http://13.56.184.144:3000/testDb");
  // Automatically added sleep
  sleep(1);
}
