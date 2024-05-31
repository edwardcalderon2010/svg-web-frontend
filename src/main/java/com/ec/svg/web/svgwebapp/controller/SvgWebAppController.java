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

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="svg_web_app")
public class SvgWebAppController {

    private final String SVG_GEN_SVC_HOST;
    private final String SVG_GEN_SVC_PORT;
    private final String SVG_GEN_SVC_CONTEXT;

    private final String SVG_GEN_SVC_ENDPOINT;
    private static final Logger logger = LoggerFactory.getLogger(SvgWebAppController.class);

    public SvgWebAppController(
            @Value("${svg.gen.svc.host}") String svgGenHost,
            @Value("${svg.gen.svc.port}") String svgGenPort,
            @Value("${SVG_GEN_SVC_CONTEXT:/svggen}") String svgGenContext) {
        SVG_GEN_SVC_HOST = svgGenHost;
        SVG_GEN_SVC_PORT = svgGenPort;
        SVG_GEN_SVC_CONTEXT = svgGenContext;
        SVG_GEN_SVC_ENDPOINT = "http://" + SVG_GEN_SVC_HOST + ":" + SVG_GEN_SVC_PORT + SVG_GEN_SVC_CONTEXT + "/";
        logger.info("######## Initialising SvgWebAppController with: " + SVG_GEN_SVC_ENDPOINT);
    }

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
                .target(SvgGeneratorClient.class, SVG_GEN_SVC_ENDPOINT);
        //logger.info("### Getting SVG content from " + input);
        SvgResponse svgResponse = svgClient.generateSvgFromInputString(input);
        //logger.info("Got JSON response: " + svgResponse.toString());
        return svgResponse;
    }

}
