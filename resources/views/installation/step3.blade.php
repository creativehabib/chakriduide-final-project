@extends('installation.installation')
@section('content')
    <div class="mar-ver pad-btm text-center">
        <h1 class="h3">Database setup</h1>
        <p>Fill this form with valid database credentials</p>
    </div>
    @if(session()->has('error'))
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    <strong>Invalid Database Credentials!! </strong>Please check your database credentials carefully
                </div>
            </div>
        </div>
    @endif
    <p class="text-muted font-13">
    <form method="POST" action="{{ route('install.db') }}">
        @csrf
        <div class="form-group">
            <label for="db_host">Database Host</label>
            <input type="text" class="form-control" id="db_host" name="DB_HOST" placeholder="localhost" required autofocus>
            <input type="hidden" name="types[]" value="DB_HOST">
        </div>
        <div class="form-group">
            <label for="db_name">Database Name</label>
            <input type="text" class="form-control" id="db_name" name="DB_DATABASE" placeholder="Your database name" required>
            <input type="hidden" name="types[]" value="DB_DATABASE">
        </div>
        <div class="form-group">
            <label for="db_user">Database Username</label>
            <input type="text" class="form-control" id="db_user" name="DB_USERNAME" placeholder="root" required>
            <input type="hidden" name="types[]" value="DB_USERNAME">
        </div>
        <div class="form-group">
            <label for="db_pass">Database Password</label>
            <input type="password" class="form-control" id="db_pass" name="DB_PASSWORD" autocomplete="off">
            <input type="hidden" name="types[]" value="DB_PASSWORD">
        </div>
        
        <div class="form-group">
            <label>
                <input type="checkbox" name="reset" value="1">
                Reset database before installing (fresh migration)
            </label>
        </div>

        <div class="text-center">
            <button type="submit" class="btn btn-primary">Continue</button>
        </div>
    </form>
    </p>
@endsection
