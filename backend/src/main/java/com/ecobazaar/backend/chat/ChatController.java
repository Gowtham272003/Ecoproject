package com.ecobazaar.backend.chat;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {

        String message = request.get("message").toLowerCase();
        String reply;

        if (message.contains("eco") || message.contains("product")) {
            reply = "Eco-friendly products: Bamboo toothbrush, reusable bottle, cloth bags.";
        }
        else if (message.contains("carbon")) {
            reply = "Carbon footprint is greenhouse gases produced by activities.";
        }
        else if (message.contains("order")) {
            reply = "Add to cart → Checkout → Payment.";
        }
        else {
            reply = "Ask about eco products, carbon footprint, or orders.";
        }

        return Map.of("reply", reply);
    }
}