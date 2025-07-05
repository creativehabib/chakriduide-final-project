<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use App\Traits\Laralink;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    use Laralink, AuthorizesRequests, ValidatesRequests;
}
