<?php
// Connects the Start a Project form to ORVANN's CRM. Copy this file to
// public/api/crm-config.php (not committed: the key is a secret), fill it in, then build
// and upload as usual — it ships as out/api/crm-config.php, next to project.php.
return [
    // The CRM's lead endpoint.
    'url' => 'https://crm.orvann.com/api/leads',
    // integration_key from the CRM's app/settings.php.
    'key' => '',
];
