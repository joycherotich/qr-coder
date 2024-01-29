// public/js/qr-code-scanner.js

// document.addEventListener('DOMContentLoaded', function () {
//     Quagga.init({
//         inputStream: {
//             name: 'Live',
//             type: 'LiveStream',
//             target: document.querySelector('#scanner-container'),
//             constraints: {
//                 width: 640,
//                 height: 180,
//                 facingMode: 'user', // or 'user' for the front camera
//             },
//         },
//         decoder: {
//             readers: ['code_128_reader'],
//         },
//         locator: {
//             patchSize: 'medium',
//             halfSample: true,
//         },
//         numOfWorkers: navigator.hardwareConcurrency || 4,
//         locate: true,
//         frequency: 5,
//         target: '#scanner-container',
//         debug: true, // Set to true to enable debug mode
//     }, function (err) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log('Quagga initialization succeeded. Starting Quagga...');
//         Quagga.start();
//     });

//     Quagga.onDetected(function (result) {
//         const data = result.codeResult.code;
    
//         // Send the scanned data to the server
//         fetch('/process-qr-code', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//             },
//             body: JSON.stringify({ scanned_data: data }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Server response:', data);
    
//             // Show success message to the user
//             alert('QR code scanned successfully!');
    
//             // Handle the server's response as needed
//         })
//         .catch(error => {
//             console.error('Error during server request:', error);
    
//             // Show error message to the user
//             alert('Error scanning QR code. Please try again.');
//         });
//     });
// });    


// public/js/qr-code-scanner.js

document.addEventListener('DOMContentLoaded', function () {
    Quagga.init({
        inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 640,
                height: 480,
                facingMode: 'user', // or 'environment' for the rear camera
            },
        },
        decoder: {
            readers: ['code_128_reader'],
        },
        locator: {
            patchSize: 'medium',
            halfSample: true,
        },
        numOfWorkers: navigator.hardwareConcurrency || 4,
        locate: true,
        frequency: 5,
        target: '#scanner-container',
        debug: true,
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Quagga initialization succeeded. Starting Quagga...');
        Quagga.start();
    });

    Quagga.onDetected(function (result) {
        console.log('Barcode detected:', result);
        const data = result.codeResult.code;
        // Send the scanned data to the server
        fetch('/process-qr-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ scanned_data: data }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the server's response and update the UI
            handleServerResponse(data);
        })
        .catch(error => console.error('Error during server request:', error));
    });

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
});
