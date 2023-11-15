package com.cs6400.team048.DB.controller;

import com.cs6400.team048.DB.entity.Appliances;
import com.cs6400.team048.DB.entity.Manufacturer;
import com.cs6400.team048.DB.service.DbService;
import com.cs6400.team048.DB.thrift.AppliancesRequest;
import com.cs6400.team048.DB.thrift.CookerRequest;
import com.cs6400.team048.DB.thrift.DryerRequest;
import com.cs6400.team048.DB.thrift.RefrigeratorFreezerRequest;
import com.cs6400.team048.DB.thrift.TVRequest;
import com.cs6400.team048.DB.thrift.WasherRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ApplianceController {
  private final DbService DbService;

  @PostMapping("/appliance")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<Appliances> appliance(@RequestBody AppliancesRequest request) {
    return DbService.getAppliance(request.email);
  }

  @GetMapping("/appliance/getmanufacturer")
  @CrossOrigin(origins = "http://localhost:3000")
  public List<Manufacturer> manufacturers() {
    return DbService.getManufacturers();
  }

  @PostMapping("/appliance/dryer")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterDryer(@RequestBody DryerRequest request) {
    return DbService.enterDryer(
        request.Email,
        request.Order,
        request.ModelName,
        request.Manufacturer,
        request.Type,
        request.HeatSource);
  }

  @PostMapping("/appliance/washer")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterWasher(@RequestBody WasherRequest request) {
    return DbService.enterWasher(
        request.Email,
        request.Order,
        request.ModelName,
        request.Manufacturer,
        request.Type,
        request.LoadingType);
  }

  @PostMapping("/appliance/refrigeratorfreezer")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterRefrigeratorFreezer(@RequestBody RefrigeratorFreezerRequest request) {
    return DbService.enterRefrigeratorFreezer(
        request.Email,
        request.Order,
        request.ModelName,
        request.Manufacturer,
        request.Type,
        request.SubType);
  }

  @PostMapping("/appliance/TV")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterTV(@RequestBody TVRequest request) {
    return DbService.enterTV(
        request.Email,
        request.Order,
        request.ModelName,
        request.Manufacturer,
        request.Type,
        request.DisplayType,
        request.Maxresolution,
        request.Size);
  }

  @PostMapping("/appliance/cooker")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterCooker(@RequestBody CookerRequest request) {
    return DbService.enterCooker(
        request.Email,
        request.Order,
        request.ModelName,
        request.Manufacturer,
        request.Type,
        request.CookerType,
        request.OvenType,
        request.OvenHeatSource,
        request.CooktopHeatSource);
  }
}
