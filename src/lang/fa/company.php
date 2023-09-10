<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 2),
    'name_max' => $maxStringMessage('نام', 50),
    'mobile_required' => $requiredMessage('شماره همراه'),
    'mobile_digits' => $digitsMessage('شماره همراه', 11),
    'mobile_gt' => $gtNumericMessage('شماره همراه', 0),
];
