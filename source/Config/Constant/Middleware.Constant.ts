import randomNumber from "../../UniqueGen/Function/NumFunction"; // Unique Generator Library

// Server Name & X-Powered-By Headers
const AllServerNames = [
  "Google LLC",
  "Microsoft Corporation",
  "Apple Inc.",
  "Amazon.com Inc.",
  "Facebook Inc.",
  "Alphabet Inc.",
  "Alibaba Group Holding Limited",
  "Tencent Holdings Limited",
  "Samsung Electronics Co., Ltd.",
  "Cisco Systems, Inc.",
  "Intel Corporation",
  "Oracle Corporation",
  "IBM Corporation",
  "Huawei Technologies Co., Ltd.",
  "NVIDIA Corporation",
  "Adobe Inc.",
  "Salesforce.com, Inc.",
  "Qualcomm Incorporated",
  "VMware, Inc.",
  "PayPal Holdings, Inc.",
  "Sony Corporation",
  "Dell Technologies Inc.",
  "HP Inc.",
  "Lenovo Group Limited",
  "Nokia Corporation",
  "Twitter, Inc.",
  "Uber Technologies, Inc.",
  "eBay Inc.",
  "Netflix, Inc.",
  "Airbnb, Inc.",
  "Lyft, Inc.",
  "Snap Inc.",
  "Pinterest, Inc.",
  "Dropbox, Inc.",
  "Spotify Technology S.A.",
  "Slack Technologies, Inc.",
  "Zoom Video Communications, Inc.",
  "Square, Inc.",
  "Zynga Inc.",
  "Electronic Arts Inc.",
  "Activision Blizzard, Inc.",
  "Take-Two Interactive Software, Inc.",
  "Nintendo Co., Ltd.",
  "Sony Interactive Entertainment LLC",
  "Microsoft Studios",
  "Ubisoft Entertainment SA",
  "Capcom Co., Ltd.",
  "Sega Corporation",
  "Konami Digital Entertainment Co., Ltd.",
  "Bandai Namco Entertainment Inc.",
  "Square Enix Holdings Co., Ltd.",
  "Tencent Games",
  "NetEase, Inc.",
  "Epic Games, Inc.",
  "Riot Games, Inc.",
  "Supercell Oy",
  "King Digital Entertainment",
  "Niantic, Inc.",
  "Roblox Corporation",
  "Unity Technologies ApS",
  "Valve Corporation",
  "Electronic Arts Inc.",
  "Activision Blizzard, Inc.",
  "Take-Two Interactive Software, Inc.",
  "Nintendo Co., Ltd.",
  "Sony Interactive Entertainment LLC",
  "Microsoft Studios",
  "Ubisoft Entertainment SA",
  "Capcom Co., Ltd.",
  "Sega Corporation",
  "Konami Digital Entertainment Co., Ltd.",
  "Bandai Namco Entertainment Inc.",
  "Square Enix Holdings Co., Ltd.",
  "Tencent Games",
  "NetEase, Inc.",
  "Epic Games, Inc.",
  "Riot Games, Inc.",
  "Supercell Oy",
  "King Digital Entertainment",
  "Niantic, Inc.",
  "Roblox Corporation",
  "Unity Technologies ApS",
  "Valve Corporation",
  "Electronic Arts Inc.",
  "Activision Blizzard Inc",
  "Take-Two Interactive Software Inc",
  "Nintendo Co Ltd",
  "Sony Interactive Entertainment LLC",
  "Ola Electric Mobility Pvt. Ltd.",
  "Ubisoft Entertainment SA",
  "Capcom Co Ltd",
  "Sega Corporation",
  "Konami Digital Entertainment Co Ltd",
  "Bandai Namco Entertainment Inc",
  "Square Enix Holdings Co Ltd",
  "Tencent Games",
  "NetEase Inc",
  "Epic Games Inc",
  "Riot Games Inc",
];

// Constants generator for Server Name Headers
export const ServerName = (): string => {
  const RandomLengthPicker: number = randomNumber(1, false, [1, 2]); // Random Choice to pick a Server Name
  const RandomServerNamePicker: number = randomNumber(RandomLengthPicker, true); // Random Server Name Position Picker

  // Return Random Server Name
  return AllServerNames[RandomServerNamePicker]; // Return Random Server Name
}; // Set Server Name

// Constants generator for X-Powered-By Header
export const XPoweredBy = (): string => {
  const RandomLengthPicker: number = randomNumber(1, false, [1, 2]); // Random Choice to pick a X-Powered-By Header
  const RandomServerNamePicker: number = randomNumber(RandomLengthPicker, true); // Random Server Name Position Picker

  // Return X-Powered-By Header
  return AllServerNames[RandomServerNamePicker].split(" ")[0]; // Return Random Server Name
}; // Set X-Powered-By Header

// Constants for Allowed HTTP Methods in IP Injection Middleware
export const IPAllowedMethods = ["PUT", "POST", "PATCH", "DELETE"]; // Allowed Methods

// Constants for Allowed HTTP Methods in Request Controller Middleware
export const AllowedMethods = [...IPAllowedMethods, "OPTIONS"]; // Allowed Methods
