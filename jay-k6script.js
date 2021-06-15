import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 2000,
  duration: '100s',
};
export default function () {
  http.get('http://localhost:3006/1/reviews');
  sleep(1);
  http.get('http://localhost:3006/2/reviews');
  sleep(1);
  http.get('http://localhost:3006/3/reviews');
  sleep(1);
  http.get('http://localhost:3006/4/reviews');
  sleep(1);
  http.get('http://localhost:3006/5/reviews');
  sleep(1);
  http.get('http://localhost:3006/6/reviews');
  sleep(1);
  http.get('http://localhost:3006/7/reviews');
  sleep(1);
  http.get('http://localhost:3006/8/reviews');
  sleep(1);
  http.get('http://localhost:3006/9/reviews');
  sleep(1);
  http.get('http://localhost:3006/10/reviews');
  sleep(1);
}