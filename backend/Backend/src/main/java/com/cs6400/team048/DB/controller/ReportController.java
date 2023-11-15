package com.cs6400.team048.DB.controller;

import com.cs6400.team048.DB.entity.State;
import com.cs6400.team048.DB.thrift.*;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ReportController {
  private final com.cs6400.team048.DB.service.DbService DbService;

  // get state info
  @GetMapping("/report/states")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<State> getStates() {
    return DbService.getStates();
  }

  // Top 25 Popular Manufacturers
  @GetMapping("/report/top25_manufacturers")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> viewTop25Manufacturers() {
    return DbService.viewTop25Manufacturers();
  }

  @PostMapping("/report/appliance_by_manufacturer")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getApplianceByManufacturers(
      @RequestBody ApplianceByManufacturerRequest request) {
    if (request.manufacturer.equals("") || request.manufacturer.equals(null)) {
      return new ArrayList<>();
    } else {
      return DbService.getApplianceByManufacturer(request.manufacturer);
    }
  }

  // Search Manufacturer/Model
  @PostMapping("/report/manufacturer_model")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> searchManufacturerModel(
      @RequestBody SearchManufacturerModelRequest request) {
    if (request.name.equals("") || request.name.equals(null) || request.name.trim().isEmpty()) {
      return new ArrayList<>();
    } else {
      return DbService.searchManufacturerModel(request.name);
    }
  }

  // Average TV Display Size by State
  @GetMapping("/report/avg_TV_display_size_by_state")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getAvgTVDisplaySizeByState() {
    return DbService.getAvgTVDisplaySizeByState();
  }

  @PostMapping("/report/TV_info_by_state")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getTVInfoByState(@RequestBody GetTVInfoByStateRequest request) {
    if (request.state.equals("") || request.state.equals(null)) {
      return new ArrayList<>();
    } else {
      return DbService.getTVInfoByState(request.state);
    }
  }

  // Extra Fridge/Freezer Report
  @GetMapping("/report/extra_fridge_household")
  @CrossOrigin(origins = "http://localhost:3000")
  public Integer getExtraFridgeHouseholdCount() {
    return DbService.getExtraFridgeHouseholdCount();
  }

  @GetMapping("/report/top10_state_by_extra_fridge_household_count")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getTop10StateByExtraFridgeHouseholdCount() {
    return DbService.getTop10StateByExtraFridgeHouseholdCount();
  }

  // Laundry Center Report
  @GetMapping("/report/most_common_laundry_by_state")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getMostCommonLaundryByState() {
    return DbService.getMostCommonLaundryByState();
  }

  @GetMapping("/report/washer_only_household_count_by_state")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getWasherOnlyHouseholdCountByState() {
    return DbService.getWasherOnlyHouseholdCountByState();
  }

  // Bathroom Statistics
  @GetMapping("/report/bathroom_statistics/all_bathrooms")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getAllBathroomStatistics() {
    return DbService.getAllBathroomStatistics();
  }

  @GetMapping("/report/bathroom_statistics/half_bathrooms")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getHalfBathroomStatistics() {
    return DbService.getHalfBathroomStatistics();
  }

  @GetMapping("/report/bathroom_statistics/full_bathrooms")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getFullBathroomStatistics() {
    return DbService.getFullBathroomStatistics();
  }

  @GetMapping("/report/bathroom_statistics/commodes")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getCommodesStatistics() {
    return DbService.getCommodesStatistics();
  }

  @GetMapping("/report/bathroom_statistics/sinks")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getSinksStatistics() {
    return DbService.getSinksStatistics();
  }

  @GetMapping("/report/bathroom_statistics/bidets")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getBidetsStatistics() {
    return DbService.getBidetsStatistics();
  }

  @GetMapping("/report/bathroom_statistics/bathtubs")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getBathtubsStatistics() {
    return DbService.getBathtubsStatistics();
  }

  @GetMapping("/report/bathroom_statistics/showers")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getShowersStatistics() {
    return DbService.getShowersStatistics();
  }

  @GetMapping("/report/bathroom_statistics/tub_showers")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<List<String>> getTubShowersStatistics() {
    return DbService.getTubShowersStatistics();
  }

  @GetMapping("/report/bathroom_statistics/most_bidets_state")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<String> getMostBidetsState() {
    return DbService.getMostBidetsState();
  }

  @GetMapping("/report/bathroom_statistics/most_bidets_postalcode")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<String> getMostBidetsPostalCode() {
    return DbService.getMostBidetsPostalCode();
  }

  @GetMapping("/report/bathroom_statistics/single_bathroom")
  @CrossOrigin(origins = "http://localhost:3000")
  public Integer getSingleBathroomHouseholdCount() {
    return DbService.getSingleBathroomHouseholdCount();
  }

  // Search/View Household Averages by Radius
  @PostMapping("/report/check_postalcode")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean verifyPostalCode(@RequestBody VerifyPostalCodeRequest request) {
    if (request.PostalCode.equals("")
        || request.PostalCode.equals(null)
        || !DbService.checkPostalCodeExistence(request.PostalCode)) {
      return false;
    } else {
      return true;
    }
  }

  @PostMapping("/report/household_avg_by_radius")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<String> getHouseholdAvgByRadius(@RequestBody GetHouseholdAvgByRadiusRequest request) {
    if (request.PostalCode.equals("")
        || request.PostalCode.equals(null)
        || !DbService.checkPostalCodeExistence(request.PostalCode)) {
      return new ArrayList<>();
    } else {
      return DbService.getHouseholdAvgByRadius(request.PostalCode, request.Radius);
    }
  }
}
