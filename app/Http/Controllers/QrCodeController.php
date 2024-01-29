<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ScannedData;

class QrCodeController extends Controller
{
    public function scanQrCode(){
        return view('scan');
    }
    public function captureQrCode(Request $request){
        $scannedData = $request->input('scanned_data');

        return response()->json(['status' => 'success', 'data' => $scannedData]);

    }
    public function processQrCode(Request $request)
    {
        // Validate that 'scanned_data' is present in the request
        $request->validate([
            'scanned_data' => 'required|string|max:255', // Adjust the validation rules as needed
        ]);
        
    
        $scannedData = $request->input('scanned_data');
    
        // Save scanned data to the database
        ScannedData::create(['data' => $scannedData]);
    
        return response()->json(['status' => 'success', 'data' => $scannedData]);
    }
}
