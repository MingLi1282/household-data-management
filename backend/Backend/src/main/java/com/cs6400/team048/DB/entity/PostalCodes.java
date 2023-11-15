package com.cs6400.team048.DB.entity;

import lombok.Value;

@Value public class PostalCodes {
  String PostalCode;
  String City;
  String State;
  Float Latitude;
  Float Longitude;

  public PostalCodes(
      String postalCode, String city, String state, Float latitude, Float longitude) {
    this.PostalCode = postalCode;
    this.City = city;
    this.State = state;
    this.Latitude = latitude;
    this.Longitude = longitude;
  }
}
