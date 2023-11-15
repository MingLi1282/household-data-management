namespace java com.cs6400.team048.DB.thrift


// Email
struct EmailRequest {
    1: string Email
}

// PostalCode
struct PostalCodeRequest {
    1: string PostalCode
}

// Phone
struct PhoneRequest {
    1: string AreaCode;
    2: string RemainingSevenDigits;
    3: string PhoneType;
    4: string Email
}

// Household info
struct HouseholdRequest {
    1: string Email;
    2: double SquareFoot;
    3: i32 Bedroom;
    4: i32 Occupants;
    5: string HouseholdType;
    6: string PostalCode
    7: string AreaCode;
    8: string RemainingSevenDigits;
    9: string PhoneType;
    10:bool PhoneInput;
}

// Primary Bathroom check
struct PrimaryBathroomRequest {
    1: string Email
}

// Full Bathroom
struct FullBathroomRequest{
    1: string Email;
    2: i32 Order;
    3: i32 Sinks;
    4: i32 Commodes;
    5: i32 Bidet;
    6: i32 Bathtub;
    7: i32 Tub_Shower;
    8: i32 Shower;
    9: string Primary
}

// Hald Bathroom
struct HalfBathroomRequest{
    1: string Email;
    2: i32 Order;
    3: i32 Sinks;
    4: i32 Commodes;
    5: i32 Bidet;
    6: string Name
}

// Show Bathrooms
struct BathroomRequest {
    1: string email
}

// Appliance
struct AppliancesRequest {
    1: string email
}

// cooker
struct CookerRequest {
    1: string Email
    2: i32 Order;
    3: string ModelName;
    4: string Manufacturer;
    5: string Type;
    6: list<string> CookerType;
    7: optional string OvenType;
    8: optional list<string> OvenHeatSource;
    9: optional string CooktopHeatSource
}

// tv
struct TVRequest {
    1: string Email
    2: i32 Order;
    3: string ModelName;
    4: string Manufacturer;
    5: string Type;
    6: string DisplayType;
    7: string Maxresolution;
    8: double Size
}

// Dryer
struct DryerRequest {
    1: string Email
    2: i32 Order;
    3: string ModelName;
    4: string Manufacturer;
    5: string Type;
    6: string HeatSource;
}


// Washer
struct WasherRequest {
    1: string Email
    2: i32 Order;
    3: string ModelName;
    4: string Manufacturer;
    5: string Type;
    6: string LoadingType;
}

// RefrigeratorFreezer
struct RefrigeratorFreezerRequest {
    1: string Email
    2: i32 Order;
    3: string ModelName;
    4: string Manufacturer;
    5: string Type;
    6: string SubType;
}

// get appliance for the entered manufacturer
struct ApplianceByManufacturerRequest {
    1: string manufacturer
}

// search models according to the entered name
struct SearchManufacturerModelRequest {
    1: string name
}

// get detailed TV info for the entered state
struct GetTVInfoByStateRequest{
    1: string state
}

// get household averages by radius
struct VerifyPostalCodeRequest{
    1: string PostalCode
}

struct GetHouseholdAvgByRadiusRequest{
    1: string PostalCode;
    2: i32 Radius
}
