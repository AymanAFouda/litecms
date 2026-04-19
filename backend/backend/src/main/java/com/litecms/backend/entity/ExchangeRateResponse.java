package com.litecms.backend.entity;

import java.util.Map;

public record ExchangeRateResponse(
    String amount,
    String base,
    String date,
    Map<String, Float> rates
) {}

