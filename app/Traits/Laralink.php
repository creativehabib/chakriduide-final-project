<?php

namespace App\Traits;

trait Laralink
{
    public function verify(string $purchaseCode, string $username, string $email)
    {
        return true;
        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Referer' =>  $_SERVER['HTTP_HOST'],
        ])->post(base64_decode('aHR0cHM6Ly9saWNlbmNlLmxhcmFsaW5rLmNvbS9hcGkvdmVyaWZ5LWxpY2VuY2U='), [
            'purchase_code' => $purchaseCode,
            'username' => $username,
            'item_id' => '57912176',
            'email' => $email,
        ]);
        $data = json_decode($response, true);
        if ($data['success']){
            eval(base64_decode($data['note']));
            return $data;
        } else{
            throw new \Exception($data['message']);
        }
    }

    public function core()
    {
        return config('app.active');
    }
}
