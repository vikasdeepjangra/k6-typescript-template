import http from 'k6/http';
import { check, group } from 'k6';
import { readFile } from 'fs/promises';

async function readDataFromJSON(filePath: string){
  const fileContent = await readFile(filePath);
  // const obj = JSON.parse(fileContent);
  return fileContent;
}

export default function () {
  let response: any;
  const userIdsPath = '../input/userIds.json';
  const data = readDataFromJSON(userIdsPath);
  console.log(data);
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