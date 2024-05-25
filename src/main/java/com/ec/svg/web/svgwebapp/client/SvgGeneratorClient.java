package com.ec.svg.web.svgwebapp.client;

import com.ec.svg.web.svgwebapp.dto.SvgResponse;
import feign.Param;
import feign.RequestLine;

public interface SvgGeneratorClient {

    String SVG_GEN_SERVICE_ENDPOINT="http://localhost:8900";

    @RequestLine("GET /svg_gen/generateAsJSON/{inputString}")
    public SvgResponse generateSvgFromInputString(@Param String inputString);

}
