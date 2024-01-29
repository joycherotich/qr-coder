<!-- resources/views/scan.blade.php -->

@extends('layouts.app')

@section('content')

<meta name="csrf-token" content="{{ csrf_token() }}">

    <div id="scanner-container"></div>
    
    <!-- Display area for scanned data -->
    <div id="scanned-data-container">
        <h2>Scanned Data:</h2>
        <p id="scanned-data"></p>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/quagga@0.12.1/dist/quagga.min.js"></script>
    <script src="{{ asset('js/qr-code-scanner.js') }}"></script>
    <!-- <script src="{{ asset('js/qr-code-scanner.js') }}"></script> -->

    <script>
        // Function to handle server response and update UI
        function handleServerResponse(response) {
            // Assuming your response contains a status and data field
            if (response.status === 'success') {
                // Update the UI with the scanned data
                document.getElementById('scanned-data').textContent = response.data;
            } else {
                console.error('Server response error:', response);
                // Handle error scenarios
            }
        }
    </script>
@endsection
