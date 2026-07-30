<?php
// Prevent script timeout for continuous streaming
set_time_limit(0);
ini_set('default_socket_timeout', 15);

// 1. Define your source IPTV M3U8 link here
$source_url = "https://example.com"; 

// 2. Clear output buffers to handle a live stream without memory bloat
if (ob_get_level()) {
    ob_end_clean();
}

// 3. Set the appropriate content headers for HLS/M3U8 streaming
header("Content-Type: application/vnd.apple.mpegurl");
header("Access-Control-Allow-Origin: *");
header("Cache-Control: no-cache, must-revalidate");

// 4. Stream the data directly to the client
$context = stream_context_create([
    "http" => [
        "method" => "GET",
        "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n"
    ]
]);

$handle = fopen($source_url, "rb", false, $context);

if ($handle) {
    while (!feof($handle) && (connection_status() == 0)) {
        echo fread($handle, 8192); // Read and output in 8KB chunks
        flush();                    // Push data immediately to the player
    }
    fclose($handle);
} else {
    http_response_code(500);
    echo "Error: Unable to connect to source stream.";
}
?>
