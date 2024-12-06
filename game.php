<?php
if (isset($_GET['mode'])) {
    $mode = $_GET['mode'];
    if ($mode === 'challenge') {
        echo "Challenge Mode";
    } elseif ($mode === 'cartoon') {
        echo "Cartoon Mode";
    } else {
        echo "Normal Mode";
    }
} else {
    echo "Mode not specified.";
}
?>
