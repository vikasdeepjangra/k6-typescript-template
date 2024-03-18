import http from 'k6/http';
import { check, group } from 'k6';
import { loginCredentials } from './input/userIds';

export default function () {
  let response: any;
  group('Login-Flow', function () {
    response = http.get(
      'https://lumen-performance-api.unext.tech/api/userservice/learning-center/user-enrolled-company-details?emailId=performancestudent5649@yopmail.com',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
          'x-content-type-options': 'nosniff',
        },
      }
    )
    check(response, {
      'response code was 200': (res) => res.status == 200,
    },
      { myTag: "LoginAPI" }
    );
  })

}