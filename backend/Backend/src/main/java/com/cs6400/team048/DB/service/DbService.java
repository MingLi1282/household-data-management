package com.cs6400.team048.DB.service;

import com.cs6400.team048.DB.entity.Appliances;
import com.cs6400.team048.DB.entity.Manufacturer;
import com.cs6400.team048.DB.entity.PostalCodes;
import com.cs6400.team048.DB.entity.State;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class DbService {
  static final String DB_URL = "jdbc:mysql://localhost:3306/cs6400_fa22_team048";
  static final String USER = "root";
  static final String PASS = "root";
  static Connection con = null;

  public static Connection getConnection() {
    if (con != null) return con;
    // get db, user, pass from settings file
    return getConnection(DB_URL, USER, PASS);
  }

  private static Connection getConnection(String url, String user, String password) {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      con = DriverManager.getConnection(url, user, password);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return con;
  }

  public boolean insert(String query) {
    boolean result = false;
    try {
      getConnection().createStatement().execute(query);
      result = true;
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return result;
  }

  public boolean checkExistence(String query) {
    boolean result = false;
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      if (rs.isBeforeFirst()) {
        result = true;
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return result;
  }

  public Boolean verifyEmail(String email) {
    String query = "SELECT Email FROM Household WHERE Email='" + email + "';";
    return !checkExistence(query);
  }

  public Boolean checkPostalCodeExistence(String postalcode) {
    String query = "SELECT PostalCode FROM PostalCodes WHERE PostalCode='" + postalcode + "';";
    return checkExistence(query);
  }

  public PostalCodes getPostalCodeInfo(String postalcode) {
    PostalCodes postalCode = null;
    String query =
        "SELECT PostalCode, City, State, Latitude, Longitude FROM PostalCodes WHERE PostalCode='"
            + postalcode
            + "';";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      if (rs.next()) {
        postalCode =
            new PostalCodes(
                rs.getString(1), rs.getString(2), rs.getString(3), rs.getFloat(4), rs.getFloat(5));
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return postalCode;
  }

  public Boolean verifyPhone(String area_code, String remaining_seven_digits) {
    String query =
        "SELECT Email FROM Phone WHERE AreaCode='"
            + area_code
            + "' AND RemainingSevenDigits='"
            + remaining_seven_digits
            + "';";
    return !checkExistence(query);
  }

  public Boolean enterPhone(
      String area_code, String remaining_seven_digits, String phone_type, String email) {
    String query =
        "INSERT INTO Phone (AreaCode, RemainingSevenDigits, PhoneType, Email) "
            + "VALUES ('"
            + area_code
            + "', '"
            + remaining_seven_digits
            + "', '"
            + phone_type
            + "', '"
            + email
            + "');";
    return insert(query);
  }

  public Boolean enterHousehold(
      String email,
      Double square_foot,
      Integer bedroom,
      Integer occupants,
      String household_type,
      String postal_code) {
    String query =
        "INSERT INTO Household (Email, SquareFoot, Bedroom, Occupants, HouseholdType, PostalCode) "
            + "VALUES ('"
            + email
            + "', '"
            + square_foot
            + "', '"
            + bedroom
            + "', '"
            + occupants
            + "', '"
            + household_type
            + "', '"
            + postal_code
            + "');";
    return insert(query);
  }

  public Boolean checkPrimaryBathroom(String email) {
    String query =
        "SELECT Email, `Order` FROM FullBathroom WHERE Email='" + email + "' AND `Primary`='1';";
    return checkExistence(query);
  }

  public Boolean enterFullBathroom(
      String email,
      Integer order,
      Integer sinks,
      Integer commodes,
      Integer bidet,
      Integer bathtub,
      Integer tub_shower,
      Integer shower,
      String primary) {
    String query =
        "INSERT INTO FullBathroom (Email, `Order`, Sinks, Commodes, Bidet, Bathtub, Tub_Shower,"
            + " Shower, `Primary` ) VALUES ('"
            + email
            + "', '"
            + order
            + "', '"
            + sinks
            + "', '"
            + commodes
            + "', '"
            + bidet
            + "', '"
            + bathtub
            + "', '"
            + tub_shower
            + "', '"
            + shower
            + "', '"
            + primary
            + "');";
    return insert(query);
  }

  public Boolean enterHalfBathroom(
      String email, Integer order, Integer sinks, Integer commodes, Integer bidet, String name) {
    String query =
        "INSERT INTO HalfBathroom (Email, `Order`, Sinks, Commodes, Bidet, Name) "
            + "VALUES ('"
            + email
            + "', '"
            + order
            + "', '"
            + sinks
            + "', '"
            + commodes
            + "', '"
            + bidet
            + "', '"
            + name
            + "');";
    return insert(query);
  }

  public List<List<String>> getBathrooms(String email) {
    List<List<String>> bathrooms = new ArrayList<>();
    String query =
        "SELECT `Order`, 'Full' AS Type, `Primary` from FullBathroom WHERE FullBathroom.Email"
            + " = '"
            + email
            + "' UNION SELECT `Order`, 'Half' AS Type, '0' AS `Primary` from HalfBathroom"
            + " WHERE HalfBathroom.Email = '"
            + email
            + "' ORDER BY `Order`;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> bathroom = new ArrayList<>();
        bathroom.add(String.valueOf(rs.getInt(1)));
        bathroom.add(rs.getString(2));
        bathroom.add(rs.getString(3));
        bathrooms.add(bathroom);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return bathrooms;
  }

  public List<Appliances> getAppliance(String email) {
    List<Appliances> appliances = new ArrayList<>();
    String query =
        "SELECT `Order`,`Type`,ModelName,Manufacturer FROM cooker WHERE `email` = '"
            + email
            + "'UNION "
            + "SELECT `Order`,`Type`,ModelName,Manufacturer FROM dryer WHERE `email` = '"
            + email
            + "'UNION "
            + "SELECT `Order`,`Type`,ModelName,Manufacturer FROM washer WHERE `email` = '"
            + email
            + "'UNION "
            + "SELECT `Order`,`Type`,ModelName,Manufacturer FROM tv WHERE `email` = '"
            + email
            + "'UNION "
            + "SELECT `Order`,`Type`,ModelName,Manufacturer FROM refrigeratorfreezer WHERE `email`"
            + " ='"
            + email
            + "'ORDER BY `Order`";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        Appliances appliance =
            new Appliances(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4));
        appliances.add(appliance);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return appliances;
  }

  public List<Manufacturer> getManufacturers() {
    List<Manufacturer> manufacturers = new ArrayList<>();
    String query = "SELECT DISTINCT manufacturer FROM Manufacturer";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        Manufacturer manufacturer = new Manufacturer(rs.getString(1));
        manufacturers.add(manufacturer);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return manufacturers;
  }

  public Boolean isAvailable(String input) {
    if (input != null && input.length() != 0) {
      return true;
    }
    return false;
  }

  public Boolean addManufacturer(String manufacturer) {
    // check and add manufacturer
    String query_manufacturer =
        "SELECT manufacturer FROM Manufacturer WHERE manufacturer='" + manufacturer + "';";
    boolean isManufacturer = checkExistence(query_manufacturer);
    if (isManufacturer) {
      return true;
    }
    if (isAvailable(manufacturer)) {
      String query_addManufacturer =
          "INSERT INTO Manufacturer (Manufacturer) VALUES('" + manufacturer + "')";
      return insert(query_addManufacturer);
    }
    return false;
  }

  public Boolean enterTV(
      String email,
      Integer order,
      String modelname,
      String manufacturer,
      String type,
      String displaytype,
      String maxresolution,
      Double size) {
    if (order <= 0) {
      return false;
    }
    if (!isAvailable(type)) {
      return false;
    }
    if (!isAvailable(displaytype)) {
      return false;
    }
    if (!isAvailable(maxresolution)) {
      return false;
    }
    if (size <= 0) {
      return false;
    }
    addManufacturer(manufacturer);
    String query =
        "INSERT INTO TV (Email, `Order`, ModelName, Manufacturer, Type, DisplayType, MaxResolution,"
            + " Size) VALUES ('"
            + email
            + "', '"
            + order
            + "', '"
            + modelname
            + "', '"
            + manufacturer
            + "', '"
            + type
            + "', '"
            + displaytype
            + "', '"
            + maxresolution
            + "', '"
            + size
            + "');";
    return insert(query);
  }

  public Boolean enterDryer(
      String email,
      Integer order,
      String modelname,
      String manufacturer,
      String type,
      String heatsource) {
    if (order <= 0) {
      return false;
    }
    if (!isAvailable(type)) {
      return false;
    }
    if (!isAvailable(heatsource)) {
      return false;
    }
    addManufacturer(manufacturer);
    String query =
        "INSERT INTO Dryer (Email, `Order`, ModelName, Manufacturer, Type,"
            + " HeatSource) VALUES ('"
            + email
            + "', '"
            + order
            + "', '"
            + modelname
            + "', '"
            + manufacturer
            + "', '"
            + type
            + "', '"
            + heatsource
            + "');";
    return insert(query);
  }

  public Boolean enterWasher(
      String email,
      Integer order,
      String modelname,
      String manufacturer,
      String type,
      String loadingtype) {
    if (order <= 0) {
      return false;
    }
    if (!isAvailable(type)) {
      return false;
    }
    if (!isAvailable(loadingtype)) {
      return false;
    }
    addManufacturer(manufacturer);
    String query =
        "INSERT INTO Washer (Email, `Order`, ModelName, Manufacturer, Type,"
            + " LoadingType) VALUES ('"
            + email
            + "', '"
            + order
            + "', '"
            + modelname
            + "', '"
            + manufacturer
            + "', '"
            + type
            + "', '"
            + loadingtype
            + "');";
    return insert(query);
  }

  public Boolean enterCooker(
      String email,
      Integer order,
      String modelname,
      String manufacturer,
      String type,
      List<String> cookertype,
      String oventype,
      List<String> ovenheatsource,
      String cookertopheatsource) {
    if (order <= 0) {
      return false;
    }
    if (!isAvailable(type)) {
      return false;
    }
    // if cookerype list empty. if cookertype list has more than 2 elemets
    if (cookertype.isEmpty()) {
      return false;
    }
    if (cookertype.size() > 2) {
      return false;
    }

    // Error check. If repeat cookertype, like ["oven", "oven"] or ["cooktop", "cooktop"]
    Set<String> cookertype_set = new HashSet<>(cookertype);
    if (cookertype_set.size() < cookertype.size()) {
      return false;
    }

    // if oven, then must have oven type and oven heat source list.
    if (cookertype.contains("oven")) {
      if (!isAvailable(oventype)) {
        return false;
      }
      if (ovenheatsource.isEmpty()) {
        return false;
      }
      if (ovenheatsource.size() > 3) {
        return false;
      }
      // Error check. If repeat cooktop heatsource, like ["gas", "gas","gas"] or ["gas", "gas",
      // "electric"]
      Set<String> ovenHeatSource_set = new HashSet<>(ovenheatsource);
      if (ovenHeatSource_set.size() < ovenheatsource.size()) {
        return false;
      }
    }
    if (cookertype.contains("cooktop")) {
      if (!isAvailable(cookertopheatsource)) {
        return false;
      }
    }

    addManufacturer(manufacturer);

    // add cooker into db
    String query_cooker =
        "INSERT INTO Cooker (Email, `Order`, ModelName, Manufacturer,"
            + "Type) VALUES ('"
            + email
            + "', '"
            + order
            + "', '"
            + modelname
            + "', '"
            + manufacturer
            + "', '"
            + type
            + "');";
    boolean result_cooker = insert(query_cooker);
    if (result_cooker != true) {
      return false;
    }
    // add cookertype into db by for loop
    int j = cookertype.size();
    for (int i = 0; i < j; i++) {
      String curCookerType = cookertype.get(i);
      String query_cookertype =
          "INSERT INTO cooker_cookertype (Email, `Order`,"
              + " CookerType) VALUES ('"
              + email
              + "', '"
              + order
              + "', '"
              + curCookerType
              + "');";
      boolean result_cookertype = insert(query_cookertype);
      if (result_cookertype != true) {
        return false;
      }

      if (curCookerType.equals("cooktop")) {
        String query_cooktopHeatSource =
            "INSERT INTO cooktop (Email, `Order`,"
                + " HeatSource) VALUES ('"
                + email
                + "', '"
                + order
                + "', '"
                + cookertopheatsource
                + "');";
        boolean result_cooktopHeatSource = insert(query_cooktopHeatSource);
        if (result_cooktopHeatSource != true) {
          return false;
        }
      }

      if (curCookerType.equals("oven")) {
        // add oven type
        String query_ovenType =
            "INSERT INTO oven (Email, `Order`,"
                + " OvenType) VALUES ('"
                + email
                + "', '"
                + order
                + "', '"
                + oventype
                + "');";
        boolean result_ovenType = insert(query_ovenType);
        if (result_ovenType != true) {
          return false;
        }
        // add oven heat sources
        int k = ovenheatsource.size();
        for (int l = 0; l < k; l++) {
          String curOvenHeatSource = ovenheatsource.get(l);
          String query_ovenHeatSource =
              "INSERT INTO oven_heatsource (Email, `Order`,"
                  + " HeatSource) VALUES ('"
                  + email
                  + "', '"
                  + order
                  + "', '"
                  + curOvenHeatSource
                  + "');";
          boolean result_ovenHeatSource = insert(query_ovenHeatSource);
          if (result_ovenHeatSource != true) {
            return false;
          }
        }
      }
    }
    return true;
  }

  public Boolean enterRefrigeratorFreezer(
      String email,
      Integer order,
      String modelname,
      String manufacturer,
      String type,
      String subtype) {
    if (order <= 0) {
      return false;
    }
    if (!isAvailable(type)) {
      return false;
    }
    if (!isAvailable(subtype)) {
      return false;
    }
    addManufacturer(manufacturer);
    String query =
        "INSERT INTO RefrigeratorFreezer (Email, `Order`, ModelName, Manufacturer, Type,"
            + " subtype) VALUES ('"
            + email
            + "', '"
            + order
            + "', '"
            + modelname
            + "', '"
            + manufacturer
            + "', '"
            + type
            + "', '"
            + subtype
            + "');";
    return insert(query);
  }

  public List<State> getStates() {
    List<State> states = new ArrayList<>();
    String query = "SELECT DISTINCT state FROM postalcodes ORDER BY state";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        State state = new State(rs.getString(1));
        states.add(state);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return states;
  }

  public List<List<String>> viewTop25Manufacturers() {
    List<List<String>> manufacturers = new ArrayList<>();
    String query =
        "SELECT Manufacturer, TotalOrder FROM (SELECT Manufacturer, TotalOrder, RANK() OVER(ORDER"
            + " BY TotalOrder DESC) CountRank FROM ( SELECT Manufacturer, COUNT(`Order`) AS"
            + " TotalOrder FROM ( SELECT r.Manufacturer, r.`Order` FROM RefrigeratorFreezer r UNION"
            + " ALL SELECT w.Manufacturer, w.`Order` FROM Washer w UNION ALL SELECT d.Manufacturer,"
            + " d.`Order` FROM Dryer d UNION ALL SELECT tv.Manufacturer, tv.`Order` FROM TV tv"
            + " UNION ALL SELECT c.Manufacturer, c.`Order` FROM Cooker c) Popular_Manufacturer"
            + " GROUP BY Manufacturer ORDER BY TotalOrder DESC) RankAll) Final WHERE CountRank <="
            + " 25 ORDER BY TotalOrder DESC LIMIT 25;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> manufacturer = new ArrayList<>();
        manufacturer.add(rs.getString(1));
        manufacturer.add(String.valueOf(rs.getInt(2)));
        manufacturers.add(manufacturer);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return manufacturers;
  }

  public List<List<String>> getApplianceByManufacturer(String manufacturer) {
    List<List<String>> appliances = new ArrayList<>();
    String query =
        "SELECT Type, COUNT(`Order`) AS TotalOrder FROM ( "
            + "SELECT r.Manufacturer, r.Type, r.`Order` FROM RefrigeratorFreezer r "
            + "UNION ALL "
            + "SELECT w.Manufacturer, w.Type, w.`Order` FROM Washer w "
            + "UNION ALL "
            + "SELECT d.Manufacturer, d.Type, d.`Order` FROM Dryer d "
            + "UNION ALL "
            + "SELECT tv.Manufacturer, tv.Type, tv.`Order` FROM TV tv "
            + "UNION ALL "
            + "SELECT c.Manufacturer, c.Type, c.`Order` FROM Cooker c) Total_Appliance "
            + "WHERE Manufacturer = '"
            + manufacturer
            + "' GROUP BY Type;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> appliance = new ArrayList<>();
        appliance.add(rs.getString(1));
        appliance.add(String.valueOf(rs.getInt(2)));
        appliances.add(appliance);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return appliances;
  }

  public List<List<String>> searchManufacturerModel(String name) {
    List<List<String>> models = new ArrayList<>();
    String query =
        "SELECT Manufacturer, ModelName FROM ( "
            + "SELECT r.Manufacturer, r.ModelName FROM RefrigeratorFreezer r "
            + "UNION "
            + "SELECT w.Manufacturer, w.ModelName FROM Washer w "
            + "UNION "
            + "SELECT d.Manufacturer, d.ModelName FROM Dryer d "
            + "UNION "
            + "SELECT tv.Manufacturer, tv.ModelName FROM TV tv "
            + "UNION "
            + "SELECT c.Manufacturer, c.ModelName FROM Cooker c) Manufacturer_Model "
            + "WHERE Manufacturer LIKE '%"
            + name
            + "%' OR ModelName LIKE '%"
            + name
            + "%' "
            + "ORDER BY Manufacturer ASC, ModelName ASC;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> model = new ArrayList<>();
        model.add(rs.getString(1));
        model.add(rs.getString(2));
        models.add(model);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return models;
  }

  public List<List<String>> getAvgTVDisplaySizeByState() {
    List<List<String>> models = new ArrayList<>();
    String query =
        "SELECT State, ROUND(AVG(Size), 1) as Average_Size "
            + "FROM PostalCodes pc "
            + "JOIN Household h ON h.PostalCode = pc.PostalCode "
            + "JOIN TV ON TV.Email = h.Email "
            + "GROUP BY State "
            + "ORDER BY State ASC;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> model = new ArrayList<>();
        model.add(rs.getString(1));
        model.add(String.valueOf(rs.getFloat(2)));
        models.add(model);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return models;
  }

  public List<List<String>> getTVInfoByState(String state) {
    List<List<String>> records = new ArrayList<>();
    String query =
        "SELECT DisplayType, MaxResolution, ROUND(AVG(Size),1) as Average_Size "
            + "FROM PostalCodes pc "
            + "JOIN Household h ON h.PostalCode = pc.PostalCode "
            + "JOIN TV ON TV.Email = h.Email "
            + "WHERE State = '"
            + state
            + "' "
            + "GROUP BY DisplayType, MaxResolution "
            + "ORDER BY Average_Size DESC;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> record = new ArrayList<>();
        record.add(rs.getString(1));
        record.add(rs.getString(2));
        record.add(String.valueOf(rs.getFloat(3)));
        records.add(record);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return records;
  }

  public Integer getExtraFridgeHouseholdCount() {
    Integer count = 0;
    String query =
        "SELECT COUNT(DISTINCT Email) AS AllHouseholdMutiFridge "
            + "FROM RefrigeratorFreezer "
            + "WHERE Email IN (SELECT Email FROM RefrigeratorFreezer GROUP BY Email HAVING"
            + " COUNT(Email)>1);";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        count = rs.getInt(1);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return count;
  }

  public List<List<String>> getTop10StateByExtraFridgeHouseholdCount() {
    List<List<String>> states = new ArrayList<>();
    String query =
        "SELECT p.State, COUNT(DISTINCT r.Email) AS NumberOfHouseHoldsWithMultipleFridgeFreezers,"
            + " CAST(100 * CAST(Count(distinct(case when r.SubType = 'chest freezer' then r.Email"
            + " end)) as SIGNED)/CAST(count(DISTINCT r.Email) as float) as SIGNED) as"
            + " ChestPercentag,  CAST(100 * CAST(Count(distinct(case when SubType = 'upright"
            + " freezer' then r.Email end)) as SIGNED)/CAST(count(DISTINCT r.Email) as float) as"
            + " SIGNED) as UprightPercentage,  CAST(100 * CAST(count(distinct(case when r.SubType"
            + " != 'upright freezer' and r.SubType != 'chest freezer' then r.Email end)) as"
            + " SIGNED)/CAST(count(DISTINCT r.Email) as float) as SIGNED) as OtherPercentage  FROM"
            + " RefrigeratorFreezer r  LEFT JOIN Household h ON h.Email = r.Email  JOIN PostalCodes"
            + " p ON p.PostalCode = h.PostalCode  WHERE r.Email IN ( SELECT r.Email FROM"
            + " RefrigeratorFreezer r GROUP BY r.Email HAVING COUNT(r.Email)>1 )  GROUP BY p.State"
            + " ORDER BY NumberOfHouseHoldsWithMultipleFridgeFreezers DESC LIMIT 10;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> state = new ArrayList<>();
        state.add(rs.getString(1));
        state.add(String.valueOf(rs.getInt(2)));
        state.add(String.valueOf(rs.getInt(3)));
        state.add(String.valueOf(rs.getInt(4)));
        state.add(String.valueOf(rs.getInt(5)));
        states.add(state);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return states;
  }

  public List<List<String>> getMostCommonLaundryByState() {
    List<List<String>> states = new ArrayList<>();
    String query =
        "SELECT state, loadingtype, heatsource FROM ( SELECT state, loadingtype, heatsource, RANK()"
            + " OVER(PARTITION BY state ORDER BY StateCountbyLoadingType DESC) TopLoadingType,"
            + " RANK() OVER(PARTITION BY state ORDER BY StateCountbyHeatSource DESC) TopHeatSource"
            + " FROM ( SELECT lt.state, loadingtype, StateCountbyLoadingType, heatsource,"
            + " StateCountbyHeatSource  FROM (SELECT state, loadingtype, COUNT(*) AS"
            + " StateCountbyLoadingType FROM (SELECT p.state, w.loadingtype FROM Household h LEFT"
            + " JOIN PostalCodes p ON p.postalcode = h.postalcode RIGHT JOIN Washer w ON"
            + " h.Email=w.email ) info GROUP BY state, loadingtype) lt JOIN (SELECT state,"
            + " heatsource,  COUNT(*) AS StateCountbyHeatSource FROM (SELECT p.state, d.heatsource"
            + " FROM Household h LEFT JOIN PostalCodes p ON p.postalcode = h.postalcode RIGHT JOIN"
            + " Dryer d ON h.Email=d.email ) info GROUP BY state, heatsource) hs on"
            + " lt.state=hs.state ) SubGroup ) Ranks WHERE TopLoadingType = 1 AND TopHeatSource = 1"
            + " ;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> state = new ArrayList<>();
        state.add(rs.getString(1));
        state.add(rs.getString(2));
        state.add(rs.getString(3));
        states.add(state);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return states;
  }

  public List<List<String>> getWasherOnlyHouseholdCountByState() {
    List<List<String>> states = new ArrayList<>();
    String query =
        "SELECT state, COUNT(DISTINCT Email) AS HouseholdCount "
            + "FROM "
            + "(SELECT h.Email, p.state, "
            + "COUNT(w.loadingtype) OVER(PARTITION BY h.Email) AS WasherCount, "
            + "COUNT(d.heatsource) OVER(PARTITION BY h.Email) AS DryerCount "
            + "FROM Household h "
            + "LEFT JOIN PostalCodes p ON p.postalcode = h.postalcode "
            + "LEFT JOIN Washer w ON h.Email=w.email "
            + "LEFT JOIN Dryer d ON h.Email=d.email "
            + ") MachineCount "
            + "WHERE WasherCount>0 AND DryerCount=0 "
            + "GROUP BY state "
            + "ORDER BY HouseholdCount DESC;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> state = new ArrayList<>();
        state.add(rs.getString(1));
        state.add(String.valueOf(rs.getInt(2)));
        states.add(state);
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return states;
  }

  public List<List<String>> fetchBathroomStatistics(String query) {
    List<List<String>> records = new ArrayList<>();
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      while (rs.next()) {
        List<String> record = new ArrayList<>();
        record.add(String.valueOf(rs.getInt(1)));
        record.add(String.valueOf(rs.getFloat(2)));
        record.add(String.valueOf(rs.getInt(3)));
        records.add(record);
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return records;
  }

  public List<List<String>> getAllBathroomStatistics() {
    String query =
        "SELECT MIN(ab.TotalBathroom) AS Minimum_Count_of_Toal_Bathroom_Per_household "
            + ", CAST(AVG(ab.TotalBathroom) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Total_Bathroom_Per_household "
            + ", MAX(ab.TotalBathroom) AS Maximum_Count_of_Total_Bathroom_Per_household "
            + "FROM ( "
            + "SELECT abe.Email, COUNT(abe.`Order`) AS TotalBathroom "
            + "FROM "
            + "(SELECT Fullbathroom.Email, Fullbathroom.`Order` FROM Fullbathroom "
            + "UNION ALL "
            + "SELECT Halfbathroom.Email, Halfbathroom.`Order` FROM Halfbathroom ) AS abe "
            + "GROUP BY abe.Email ) AS ab;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getHalfBathroomStatistics() {
    String query =
        "SELECT MIN(hb.HalfBathroomCount) AS Minimum_Count_of_Half_Bathroom_Per_household "
            + ", CAST(AVG(hb.HalfBathroomCount) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Half_Bathroom_Per_household "
            + ", MAX(hb.HalfBathroomCount) AS Maximum_Count_of_Half_Bathroom_Per_household "
            + "FROM (SELECT HalfBathroom.Email, COUNT(HalfBathroom.Email) AS HalfBathroomCount "
            + "FROM HalfBathroom "
            + "GROUP BY HalfBathroom.Email) hb;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getFullBathroomStatistics() {
    String query =
        "SELECT MIN(fb.FullBathroomCount) AS Minimum_Count_of_Full_Bathroom_Per_household "
            + ", CAST(AVG(fb.FullBathroomCount) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Full_Bathroom_Per_household "
            + ", MAX(fb.FullBathroomCount) AS Maximum_Count_of_Full_Bathroom_Per_household "
            + "FROM (SELECT FullBathroom.Email, COUNT(FullBathroom.Email) AS FullBathroomCount "
            + "FROM FullBathroom "
            + "GROUP BY FullBathroom.Email) fb;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getCommodesStatistics() {
    String query =
        "SELECT MIN(ac.TotalCommodes) AS Minimum_Count_of_Total_Commodes_Per_household "
            + ", CAST(AVG(ac.TotalCommodes) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Total_Commodes_Per_household "
            + ", MAX(ac.TotalCommodes) AS Maximum_Count_of_Total_Commodes_Per_household "
            + "FROM ( "
            + "SELECT ace.Email, SUM(ace.Commodes) AS TotalCommodes "
            + "FROM "
            + "(SELECT Fullbathroom.Email, Fullbathroom.Commodes FROM Fullbathroom "
            + "UNION ALL "
            + "SELECT Halfbathroom.Email, Halfbathroom.Commodes FROM Halfbathroom) AS ace "
            + "GROUP BY ace.Email) AS ac;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getSinksStatistics() {
    String query =
        "SELECT MIN(asinks.Totalsinks) AS Minimum_Count_of_Total_sinks_Per_household "
            + ", CAST(AVG(asinks.Totalsinks) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Total_sinks_Per_household "
            + ", MAX(asinks.Totalsinks) AS Maximum_Count_of_Total_sinks_Per_household "
            + "FROM ( "
            + "SELECT ase.Email, SUM(ase.sinks) AS Totalsinks "
            + "FROM "
            + "(SELECT Fullbathroom.Email, Fullbathroom.Sinks FROM Fullbathroom "
            + "UNION ALL "
            + "SELECT Halfbathroom.Email, Halfbathroom.Sinks FROM Halfbathroom) AS ase "
            + "GROUP BY ase.Email) AS asinks;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getBidetsStatistics() {
    String query =
        "SELECT MIN(abidet.TotalBidet) AS Minimum_Count_of_Total_Bidet_Per_household "
            + ", CAST(AVG(abidet.TotalBidet) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Total_Bidet_Per_household "
            + ", MAX(abidet.TotalBidet) AS Maximum_Count_of_Total_Bidet_Per_household "
            + "FROM ( "
            + "SELECT abi.Email, SUM(abi.Bidet) AS TotalBidet "
            + "FROM "
            + "(SELECT Fullbathroom.Email, Fullbathroom.Bidet FROM Fullbathroom "
            + "UNION ALL "
            + "SELECT Halfbathroom.Email, Halfbathroom.Bidet FROM Halfbathroom) AS abi "
            + "GROUP BY abi.Email) AS abidet;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getBathtubsStatistics() {
    String query =
        "SELECT MIN(abathtub.TotalBathtub) AS Minimum_Count_of_Bathtub_Per_household"
            + " ,CAST(AVG(abathtub.TotalBathtub) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Bathtub_Per_household ,MAX(abathtub.TotalBathtub) AS"
            + " Maximum_Count_of_Bathtub_Per_household FROM (SELECT SUM(FullBathroom.Bathtub) AS"
            + " TotalBathtub, AllEmail.Email FROM (SELECT FullBathroom.Email FROM FullBathroom"
            + " UNION SELECT Household.Email FROM Household) AllEmail LEFT JOIN FullBathroom ON"
            + " AllEmail.Email = FullBathroom.Email GROUP BY AllEmail.Email) abathtub;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getShowersStatistics() {
    String query =
        "SELECT MIN(ashower.TotalShower) AS Minimum_Count_of_Shower_Per_household ,"
            + " CAST(AVG(ashower.TotalShower) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Shower_Per_household,MAX(ashower.TotalShower) AS"
            + " Maximum_Count_of_Shower_Per_household FROM (SELECT SUM(FullBathroom.Shower)AS"
            + " TotalShower, AllEmail.Email FROM (SELECT FullBathroom.Email FROM FullBathroom UNION"
            + " SELECT Household.Email FROM Household) AllEmail LEFT JOIN FullBathroom ON"
            + " AllEmail.Email = FullBathroom.Email GROUP BY AllEmail.Email) ashower;";
    return fetchBathroomStatistics(query);
  }

  public List<List<String>> getTubShowersStatistics() {
    String query =
        " SELECT MIN(atubshower.TotalTub_Shower) AS Minimum_Count_of_Tub_Shower_Per_household  ,"
            + " CAST(AVG(atubshower.TotalTub_Shower) AS DECIMAL(10,1)) AS"
            + " Average_Count_of_Tub_Shower_Per_household , MAX(atubshower.TotalTub_Shower) AS"
            + " Maximum_Count_of_Tub_Shower_Per_household  FROM (SELECT"
            + " SUM(FullBathroom.Tub_Shower)AS TotalTub_Shower, AllEmail.Email FROM (SELECT"
            + " FullBathroom.Email FROM FullBathroom UNION SELECT Household.Email FROM Household)"
            + " AllEmail LEFT JOIN FullBathroom ON AllEmail.Email = FullBathroom.Email GROUP BY"
            + " AllEmail.Email) AS atubshower;";
    return fetchBathroomStatistics(query);
  }

  public List<String> getMostBidetsState() {
    List<String> result = new ArrayList<>();
    String query =
        "SELECT SBidet.State, SBidet.StateBidet "
            + "FROM "
            + "(SELECT State, SUM(Bidet) AS StateBidet, RANK() OVER(ORDER BY SUM(Bidet) DESC)"
            + " StateRank "
            + "FROM (SELECT Fullbathroom.Email, Fullbathroom.Bidet FROM Fullbathroom "
            + "UNION ALL SELECT Halfbathroom.Email, Halfbathroom.Bidet FROM Halfbathroom "
            + ") AS abi "
            + "LEFT JOIN Household ON Household.Email = abi.Email "
            + "LEFT JOIN PostalCodes ON Postalcodes.Postalcode =Household.Postalcode "
            + "GROUP BY State "
            + ") AS SBidet "
            + "WHERE SBidet.StateRank = 1;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      if (rs.next()) {
        result.add(rs.getString(1));
        result.add(String.valueOf(rs.getInt(2)));
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return result;
  }

  public List<String> getMostBidetsPostalCode() {
    List<String> result = new ArrayList<>();
    String query =
        "SELECT SBidet.PostalCode, SBidet.PCBidet "
            + "FROM "
            + "(SELECT Household.PostalCode, SUM(Bidet) AS PCBidet, RANK() OVER(ORDER BY SUM(Bidet)"
            + " DESC) PCRank "
            + "FROM (SELECT Fullbathroom.Email, Fullbathroom.Bidet FROM Fullbathroom "
            + "UNION ALL SELECT Halfbathroom.Email, Halfbathroom.Bidet FROM Halfbathroom "
            + ") AS abi "
            + "LEFT JOIN Household ON Household.Email = abi.Email "
            + "LEFT JOIN PostalCodes ON Postalcodes.Postalcode =Household.Postalcode "
            + "GROUP BY Household.PostalCode "
            + ") AS SBidet "
            + "WHERE SBidet.PCRank = 1;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      if (rs.next()) {
        result.add(rs.getString(1));
        result.add(String.valueOf(rs.getInt(2)));
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return result;
  }

  public Integer getSingleBathroomHouseholdCount() {
    Integer count = 0;
    String query =
        "SELECT COUNT(FullBathroom.Email) AS Household_SinglePriBathroom "
            + "FROM Fullbathroom "
            + "WHERE FullBathroom.`Primary` = '1' AND FullBathroom.email "
            + "IN ( "
            + "SELECT tbath.Email "
            + "FROM "
            + "(SELECT abe.Email, COUNT(abe.`Order`) AS TotalBathroom "
            + "FROM "
            + "(SELECT Fullbathroom.Email, Fullbathroom.`Order` FROM Fullbathroom "
            + "UNION ALL "
            + "SELECT Halfbathroom.Email, Halfbathroom.`Order` FROM Halfbathroom ) AS abe "
            + "GROUP BY abe.Email) AS tbath "
            + "WHERE tbath.TotalBathroom = 1);";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      if (rs.next()) {
        count = rs.getInt(1);
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return count;
  }

  public List<String> getHouseholdAvgByRadius(String postalcode, Integer radius) {
    List<String> result = new ArrayList<>();
    String query =
        "with Center as ( " +
                "select Latitude as CenterLatitude, Longitude as CenterLongitude from PostalCodes where PostalCode = '" + postalcode +
                "'), " +
                "AllPostalCodes as( " +
                "select PostalCode, (3958.75 * 2 * atan2( sqrt(power(sin((radians(CenterLatitude)-radians(Latitude))/2), 2) + cos(radians(Latitude))*cos(radians(CenterLatitude))*power(sin((radians(CenterLongitude)-radians(Longitude))/2), 2)), " +
                "sqrt(1-(power(sin((radians(CenterLatitude)-radians(Latitude))/2), 2) + cos(radians(Latitude))*cos(radians(CenterLatitude))*power(sin((radians(CenterLongitude)-radians(Longitude))/2), 2))))) as Radius " +
                "from PostalCodes cross join Center " +
                "), " +
                "ValidPostalCodes as ( " +
                "select h.Email, AllPostalCodes.PostalCode, " + radius + " as Radius, h.Bedroom, h.Occupants " +
                "from HouseHold h, AllPostalCodes " +
                "where AllPostalCodes.Radius <= " + radius + " and h.PostalCode = AllPostalCodes.PostalCode " +
                "), " +
                "BathInfo as ( " +
                "select Email, count(*) as BathRoomCount, sum(Commodes) as CommodesCount from ( " +
                "Select Email, Commodes from FullBathroom f Where f.Email in (Select Email from ValidPostalCodes) " +
                "union all " +
                "select Email, Commodes from HalfBathroom h Where h.Email in (Select Email from ValidPostalCodes)" +
                ") as b " +
                "group by Email " +
                "), " +
                "Appliance as ( " +
                "Select Email, count(Email) as c from( " +
                "Select Email from RefrigeratorFreezer r Where r.Email in (Select Email from ValidPostalCodes) " +
                "union all " +
                "Select Email from Cooker c Where c.Email in (Select Email from ValidPostalCodes) " +
                "union all " +
                "select Email from Washer w Where w.Email in (Select Email from ValidPostalCodes) " +
                "union all " +
                "select Email from Dryer d Where d.Email in (Select Email from ValidPostalCodes) " +
                "union all " +
                "select Email from TV t Where t.Email in (Select Email from ValidPostalCodes)" +
                ") as a " +
                "group by Email " +
                "), " +
                "Calculation as ( " +
                "select '" + postalcode + "' as PostalCode, ValidPostalCodes.Radius, " +
                "CAST(CAST(sum(BathInfo.BathRoomCount) as float(10))/CAST(count(ValidPostalCodes.Email) as float(10)) as decimal(5,1)) as AVG_BathRoom, " +
                "CAST(CAST(sum(ValidPostalCodes.Bedroom) as float(10))/CAST(count(ValidPostalCodes.Email) as float(10)) as decimal(5,1)) as AVG_Bedroom, " +
                "CAST(CAST(sum(ValidPostalCodes.Occupants) as float(10))/CAST(count(ValidPostalCodes.Email) as float(10)) as SIGNED) as AVG_Occupants, " +
                "CAST(CAST(sum(ValidPostalCodes.Occupants) as float(10))/CAST(sum(BathInfo.CommodesCount) as float(10)) as decimal(5,2)) as CommadeToOccupantRatio, " +
                "CAST(CAST(sum(Appliance.c) as float(10))/CAST(count(ValidPostalCodes.Email) as float(10)) as decimal(5,1)) as AVG_Appliance " +
                "from ValidPostalCodes, BathInfo, Appliance " +
                "where ValidPostalCodes.Email = BathInfo.Email and ValidPostalCodes.Email = Appliance.Email " +
                "), " +
                "HeatSource as ( " +
                "Select HeatSource as MostCommonHeatSource from( " +
                "select HeatSource from Oven_HeatSource o Where o.Email in (Select Email from ValidPostalCodes) " +
                "union all " +
                "select HeatSource from Dryer d Where d.Email in (Select Email from ValidPostalCodes) " +
                "union all " +
                "select HeatSource from Cooktop c Where c.Email in (Select Email from ValidPostalCodes)" +
                ") as h " +
                "group by HeatSource " +
                "order by count(*) desc " +
                "limit 1 " +
                ") " +
                "select Calculation.*, HeatSource.MostCommonHeatSource from Calculation, HeatSource;";
    try (ResultSet rs = getConnection().createStatement().executeQuery(query)) {
      if (rs.next()) {
        result.add(rs.getString(1));
        result.add(String.valueOf(rs.getInt(2)));
        result.add(String.valueOf(rs.getFloat(3)));
        result.add(String.valueOf(rs.getFloat(4)));
        result.add(String.valueOf(rs.getInt(5)));
        if (rs.getString(6).equals("null")){
          result.add("null");
        } else {
          result.add("1:" + rs.getString(6));
        }
        result.add(String.valueOf(rs.getFloat(7)));
        result.add(rs.getString(8));
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return result;
  }
}
