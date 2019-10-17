<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.airtable.com/v0/apptOEmqYz7lsI9aE/Table%201?view=Grid%20view",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Accept: */*",
    "Accept-Encoding: gzip, deflate",
    "Authorization: Bearer keyxx6a4lVjRigIjv",
    "Cache-Control: no-cache",
    "Connection: keep-alive",
    "Cookie: brw=brwDqi8UuiSRE9ZLh",
    "Host: api.airtable.com",
    "Postman-Token: d2b7385a-274e-4a5e-8581-35fa03901c69,51c2099e-fa9f-4c17-a75e-f7e25e2f2f44",
    "User-Agent: PostmanRuntime/7.18.0",
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

?>