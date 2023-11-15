package com.cs6400.team048.DB.entity;

import java.util.List;
import lombok.Value;

@Value public class cooker {
  String Email;
  Integer Order;
  String ModelName;
  String Manufacturer;
  String Type;
  List<String> CookerType;
  String OvenType;
  List<String> OvenHeatSource;
  String CookerHeatSource;
}
