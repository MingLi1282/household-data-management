package com.cs6400.team048.DB.entity;

import lombok.Value;

@Value public class Household {

  String Email;
  Float SquareFoot;
  Integer Bedroom;
  Integer Occupants;
  String HouseholdType;
  String PostalCode;
}
