package com.ec.svg.web.svgwebapp.controller;

import com.ec.svg.web.svgwebapp.client.SvgGeneratorClient;
import com.ec.svg.web.svgwebapp.dto.SvgResponse;
import feign.Feign;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.jaxb.JAXBDecoder;
import feign.jaxb.JAXBContextFactory;

import feign.jaxb.JAXBEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="svg_web_app")
public class SvgWebAppController {

    private static final Logger logger = LoggerFactory.getLogger(SvgWebAppController.class);

    @GetMapping(path="/hello")
    public @ResponseBody String hello() {
        logger.info("Calling hello service");
        return "hello!";
    }

    @GetMapping(path="/remote/svg_gen/{inputString}")
    public @ResponseBody SvgResponse getGeneratedSvg(@PathVariable("inputString")String input) {

        JAXBContextFactory jaxbFactory = new JAXBContextFactory.Builder()
                .withMarshallerJAXBEncoding("UTF-8")
                .withMarshallerSchemaLocation("http://apihost http://apihost/schema.xsd")
                .build();

        SvgGeneratorClient svgClient = Feign.builder()
                .encoder(new JacksonEncoder())
                .decoder(new JacksonDecoder())
                .target(SvgGeneratorClient.class, SvgGeneratorClient.SVG_GEN_SERVICE_ENDPOINT);
        SvgResponse svgResponse = svgClient.generateSvgFromInputString(input);
        logger.info("Got JSON response: " + svgResponse.toString());
        return svgResponse;
    }

}
