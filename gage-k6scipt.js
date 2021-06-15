import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    // { duration: "1m", target: 150 },
    // { duration: "1m", target: 250 },
    // { duration: "1m", target: 500 },
    { duration: "1m", target: 10 },
    // { duration: "1m", target: 1500 },
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
  response = http.get("http://52.53.225.72:3000/testDb");
  // Automatically added sleep
  sleep(1);
}