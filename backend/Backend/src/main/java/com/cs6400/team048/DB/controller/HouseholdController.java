package com.cs6400.team048.DB.controller;

import com.cs6400.team048.DB.entity.PostalCodes;
import com.cs6400.team048.DB.thrift.EmailRequest;
import com.cs6400.team048.DB.thrift.HouseholdRequest;
import com.cs6400.team048.DB.thrift.PhoneRequest;
import com.cs6400.team048.DB.thrift.PostalCodeRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class HouseholdController {
  private final com.cs6400.team048.DB.service.DbService DbService;

  // Enter Email Address
  @PostMapping("/household/verify_email")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean verifyEmail(@RequestBody EmailRequest request) {
    if (request.Email.equals("")
        || request.Email.equals(null)
        || request.Email.trim().isEmpty()
        || request.Email.startsWith(" ")
        || !request.Email.contains("@")) {
      return false;
    } else {
      return DbService.verifyEmail(request.Email);
    }
  }

  // Enter Postal Code
  @PostMapping("/household/enter_postalcode")
  @CrossOrigin(origins = "http://localhost:3000")
  public PostalCodes getPostalCodeInfo(@RequestBody PostalCodeRequest request) {
    return DbService.getPostalCodeInfo(request.PostalCode);
  }

  // Enter Phone Number
  @PostMapping("/household/enter_phone")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterPhone(@RequestBody PhoneRequest request) {
    if (request.AreaCode.equals("")
        || request.AreaCode.equals(null)
        || request.RemainingSevenDigits.equals("")
        || request.RemainingSevenDigits.equals(null)) {
      return false;
    } else {
      Pattern pattern_area = Pattern.compile("^\\d{3}$");
      Pattern pattern_last7 = Pattern.compile("^\\d{7}$");
      Matcher matcher_area = pattern_area.matcher(request.AreaCode);
      Matcher matcher_last7 = pattern_last7.matcher(request.RemainingSevenDigits);
      if (!matcher_area.matches() || !matcher_last7.matches()) {
        return false;
      } else {
        return DbService.verifyPhone(request.AreaCode, request.RemainingSevenDigits);
      }
    }
  }

  // Enter Household Info
  @PostMapping("/household/enter_household")
  @CrossOrigin(origins = "http://localhost:3000")
  public Boolean enterHousehold(@RequestBody HouseholdRequest request) {
    if (request.SquareFoot <= 0) {
      return false;
    } else {
      Boolean enter_household_result =
          DbService.enterHousehold(
              request.Email,
              request.SquareFoot,
              request.Bedroom,
              request.Occupants,
              request.HouseholdType,
              request.PostalCode);
      Boolean enter_phone_result = true;
      if (request.PhoneInput) {
        enter_phone_result =
            DbService.enterPhone(
                request.AreaCode, request.RemainingSevenDigits, request.PhoneType, request.Email);
      }
      return enter_household_result && enter_phone_result;
    }
  }
}
