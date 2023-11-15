package com.cs6400.team048.DB.controller;

import com.cs6400.team048.DB.thrift.*;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BathroomController {
  private final com.cs6400.team048.DB.service.DbService DbService;

  // Add Bathroom
  @PostMapping("/bathroom")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean checkPrimaryBathroom(@RequestBody PrimaryBathroomRequest request) {
    return DbService.checkPrimaryBathroom(request.Email);
  }

  @PostMapping("/bathroom/enter_full_bathroom")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterFullBathroom(@RequestBody FullBathroomRequest request) {
    return DbService.enterFullBathroom(
        request.Email,
        request.Order,
        request.Sinks,
        request.Commodes,
        request.Bidet,
        request.Bathtub,
        request.Tub_Shower,
        request.Shower,
        request.Primary);
  }

  @PostMapping("/bathroom/enter_half_bathroom")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterHalfBathroom(@RequestBody HalfBathroomRequest request) {
    return DbService.enterHalfBathroom(
        request.Email, request.Order, request.Sinks, request.Commodes, request.Bidet, request.Name);
  }

  // Show Bathroom List
  @PostMapping("/bathroom/get_bathrooms")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getBathrooms(@RequestBody BathroomRequest request) {
    return DbService.getBathrooms(request.email);
  }
}
