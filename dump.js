const fs = require("fs");
const db = require("./apps/models");
const {
  encryptedString,
  decryptedString,
} = require("./apps/middleware/encryptr/encryptr");

// Read JSON data from file
fs.readFile("./seeder_json/banner.json", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    const jsonBannerData = JSON.parse(data);

    for (var i = 0; i < jsonBannerData.length; ++i) {
      await db.banner.create({
        banner_name: jsonBannerData[i].banner_name,
        banner_image: jsonBannerData[i].banner_image,
        description: jsonBannerData[i].description
      });
    }
    console.log("Seeder banner success...");
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
});

fs.readFile("./seeder_json/services.json", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    const jsonServicesData = JSON.parse(data);

    for (var i = 0; i < jsonServicesData.length; ++i) {
      await db.services.create({
        service_code: jsonServicesData[i].service_code,
        service_name: jsonServicesData[i].service_name,
        service_icon: jsonServicesData[i].service_icon,
        service_tariff: jsonServicesData[i].service_tariff
      });
    }
    console.log("Seeder services success...");
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
});

fs.readFile("./seeder_json/membership.json", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    const jsonMembershipData = JSON.parse(data);

    for (var i = 0; i < jsonMembershipData.length; ++i) {
      await db.membership.create({
        first_name: jsonMembershipData[i].firstname,
        last_name: jsonMembershipData[i].lastname,
        email: jsonMembershipData[i].email,
        password: await encryptedString(jsonMembershipData[i].password),
        profile_image: jsonMembershipData[i].profile_image
      });
    }
    console.log("Seeder membership success...");
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
});