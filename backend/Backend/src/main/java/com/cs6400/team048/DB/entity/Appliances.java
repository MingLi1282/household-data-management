package com.cs6400.team048.DB.entity;

import lombok.Value;

@Value public class Appliances {
  Integer Order;
  String Type;
  String ModelName;
  String Manufacturer;

  public Appliances(Integer order, String type, String ModelName, String Manufacturer) {
    this.Order = order;
    this.Type = type;
    this.ModelName = ModelName;
    this.Manufacturer = Manufacturer;
  }
}
